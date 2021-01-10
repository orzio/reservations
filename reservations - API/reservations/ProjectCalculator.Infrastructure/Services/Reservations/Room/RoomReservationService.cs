using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Reservations.Infrastructure.Services.Reservations.Validators;
using System.Threading;
using Reservations.Infrastructure.IoC;
using Reservations.Infrastructure.Services.Email;

namespace Reservations.Infrastructure.Services.Reservations.Room
{
    public class RoomReservationService : IRoomReservationService
    {
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IRoomReservationRepository _roomReservationRepository;

        public RoomReservationService(IRoomReservationRepository roomReservationRepository, IMapper mapper, IEmailService emailService)
        {
            _roomReservationRepository = roomReservationRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task ReserveRoom(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime)
        {
            try
            {
                await _roomReservationRepository.AddAsync(reservationId, userId, roomId, startTime, endTime.AddMinutes(-1));
                
            }catch(Exception e)
            {
                throw new Exception("Cannot add reservation");
            }

        }

        private  async Task Check(Guid roomId, DateTime startTime, DateTime endTime)
        {
            var reservations = (await _roomReservationRepository.GetReservationByRoomIdAsync(roomId)).Cast<IReservation>().ToList();
            var validators = new List<IReservationValidator>()
                {
                    new EventStartsWithinOther(startTime, reservations),
                    new EventEndsWithinOther(endTime, reservations),
                    new EventCoversOther(startTime, endTime, reservations),
                };

            foreach (var validator in validators)
            {
                if (!validator.Verify())
                {
                    throw new Exception("Cannot add reservation");
                }
            }
        }

        public async Task<IEnumerable<RoomReservationDto>> BrowseAsync()
        {
            var reservations = await _roomReservationRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<RoomReservation>, IEnumerable<RoomReservationDto>>(reservations);
        }

        public async Task<RoomReservationDto> GetAsync(Guid reservationId)
        {
            var reservation = await _roomReservationRepository.GetAsync(reservationId);
            return _mapper.Map<RoomReservation, RoomReservationDto>(reservation);
        }

        public async Task RemoveReservation(Guid reservationId)
        {
            await _roomReservationRepository.DeleteAsync(reservationId);
        }


        public async Task<IEnumerable<RoomOfficeReservationDto>> GetRoomWithOfficeReservationsAsync(Guid userId)
        {
            var reservations = await _roomReservationRepository.GetReservationByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<RoomReservation>, IEnumerable<RoomOfficeReservationDto>>(reservations);
        }

        public async Task UpdateReservation(Guid reservationId, DateTime start, DateTime end)
        {
            await _roomReservationRepository.UpdateAsync(reservationId, start, end);
        }

        public async Task<IEnumerable<RoomReservationDto>> GetRoomReservationsAsync(Guid roomId)
        {
            var reservations = await _roomReservationRepository.GetReservationByRoomIdAsync(roomId);
            return _mapper.Map<IEnumerable<RoomReservation>, IEnumerable<RoomReservationDto>>(reservations);
        }

        public async Task<IEnumerable<RoomReservationForManagerDto>> GetAllReservationForManager(Guid managerId)
        {
            var reservations = await _roomReservationRepository.GetAllReservationByManagerIdAsync(managerId);
            return _mapper.Map<IEnumerable<RoomReservation>, IEnumerable<RoomReservationForManagerDto>>(reservations);
        }

        public async Task UpdateReservationStatus(Guid id, int status)
        {
            await _roomReservationRepository.UpdateReservationStatus(id, status);
            var reservation = await _roomReservationRepository.GetAsyncWithFullInfo(id);
            await SendStatusChangedMessage(reservation.User.Email, status, reservation.StartDate, reservation.EndDate, reservation.Room.Office.Name,
                reservation.Room.Office.Address.City, reservation.Room.Office.Address.Street, reservation.Room.Office.Address.ZipCode, reservation.Room.Name);
        }

        private async Task SendStatusChangedMessage(string userEmail, int status, DateTime startDate, DateTime endDate, string officeName,
                                                    string officeCity, string OfficeStreet, string ZipCode, string itemName)
        {
            var statusDictionary = new Dictionary<int, string>()
            {
                { 0,$"Twoja rezerwacja sali - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Anulowana. Prosimy o wybranie innego terminu. Dziękujemy za skorzystanie z naszych usług." +
                $"Pozdrawiamy - {officeName} " },
                { 1,$"Twoja rezerwacja sali - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Potwierdzony.\n " +
                $"Zapraszamy {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}. Dziękujemy za skorzystanie z naszych usług. " +
                $"Pozdrawiamy - {officeName} " },
                { 2,$"Twoja rezerwacja sali - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Czeka na potwierdzenie. Dziękujemy za skorzystanie z naszych usług. " +
                $"Pozdrawiamy - {officeName} " }
            };

            var emailSubject = $"{officeName} - Rezerwacja sali - {itemName} z {startDate.Date.ToString("d")}";
            await _emailService.SendEmail(userEmail, statusDictionary[status], emailSubject);


        }
    }
}
