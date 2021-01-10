using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using Reservations.Infrastructure.Helpers;
using Reservations.Infrastructure.Services.Email;
using Reservations.Infrastructure.Services.Reservations.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class DeskReservationService : IDeskReservationService
    {
        private readonly IEmailService _emailService;
        private readonly IDeskReservationRepository _deskReservationRepository;
        private readonly IMapper _mapper;

        public DeskReservationService(IDeskReservationRepository deskReservationRepository, IMapper mapper, IEmailService emailService,
            IUserService userService)
        {
            _emailService = emailService;
            _deskReservationRepository = deskReservationRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DeskReservationDto>> BrowseAsync()
        {
            var reservations = await _deskReservationRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<DeskReservation>, IEnumerable<DeskReservationDto>>(reservations);
        }

        public async Task<DeskReservationDto> GetAsync(Guid reservationId)
        {
            var reservation = await _deskReservationRepository.GetAsync(reservationId);
            return _mapper.Map<DeskReservation, DeskReservationDto>(reservation);
        }

        public async Task<IEnumerable<DeskReservationDto>> GetDeskReservationsAsync(Guid deskId)
        {
            var reservations = await _deskReservationRepository.GetReservationByDeskIdAsync(deskId);
            return _mapper.Map<IEnumerable<DeskReservation>, IEnumerable<DeskReservationDto>>(reservations);
        }

        public async Task<IEnumerable<DeskOfficeReservationDto>> GetDeskWithOfficeReservationsAsync(Guid userId)
        {
            var reservations = await _deskReservationRepository.GetReservationByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<DeskReservation>, IEnumerable<DeskOfficeReservationDto>>(reservations);
        }


        public async Task RemoveReservation(Guid reservationId)
        {
            await _deskReservationRepository.DeleteAsync(reservationId);
        }

        public async Task ReserveDesk(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
            try
            {
               await _deskReservationRepository.AddAsync(reservationId, userId, deskId, startTime, endTime.AddMinutes(-1));

            }
            catch (Exception e)
            {
                throw new Exception("Nie da sie dodac rezewacji");
            }
            //await UpdateReservationStatus(reservationId, (int)ReservationStatus.WatingForApproval);
        }

        public async Task UpdateReservation(Guid reservationId, DateTime start, DateTime end)
        {
            await _deskReservationRepository.UpdateAsync(reservationId, start, end);
        }


        public async Task<IEnumerable<DeskReservationForManagerDto>> GetAllReservationForManager(Guid managerId)
        {
            var reservations = await _deskReservationRepository.GetAllReservationByManagerIdAsync(managerId);
            return _mapper.Map<IEnumerable<DeskReservation>, IEnumerable<DeskReservationForManagerDto>>(reservations);
        }

        public async Task UpdateReservationStatus(Guid id, int status)
        {
            await _deskReservationRepository.UpdateReservationStatus(id, status);
            var reservation = await _deskReservationRepository.GetAsyncWithFullInfo(id);
            await SendStatusChangedMessage(reservation.User.Email, status, reservation.StartDate, reservation.EndDate,reservation.Desk.Office.Name,
                reservation.Desk.Office.Address.City, reservation.Desk.Office.Address.Street, reservation.Desk.Office.Address.ZipCode, reservation.Desk.Name);
        }

        private async Task SendStatusChangedMessage(string userEmail,int status, DateTime startDate, DateTime endDate, string officeName,
                                                    string officeCity, string OfficeStreet, string ZipCode,string itemName)
        {
            var statusDictionary = new Dictionary<int, string>()
            {
                { 0,$"Twoja rezerwacja biurka - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Anulowana. Prosimy o wybranie innego terminu. Dziękujemy za skorzystanie z naszych usług." +
                $"Pozdrawiamy - {officeName} " },
                { 1,$"Twoja rezerwacja biurka - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Potwierdzony.\n " +
                $"Zapraszamy {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}. Dziękujemy za skorzystanie z naszych usług. " +
                $"Pozdrawiamy - {officeName} " },
                { 2,$"Twoja rezerwacja biurka - {itemName} (w dniu {startDate.Date.ToString("d")} w godzinach {startDate.TimeOfDay} - {endDate.TimeOfDay}) w biurze {officeName} ({OfficeStreet},{ZipCode} {officeCity}) uzyskała status - Czeka na potwierdzenie. Dziękujemy za skorzystanie z naszych usług. " +
                $"Pozdrawiamy - {officeName} " }
            };

           var emailSubject = $"{officeName} - Rezerwacja biurka - {itemName} z {startDate.Date.ToString("d")}";
           await _emailService.SendEmail(userEmail, statusDictionary[status], emailSubject);

      
        }

    }
}
