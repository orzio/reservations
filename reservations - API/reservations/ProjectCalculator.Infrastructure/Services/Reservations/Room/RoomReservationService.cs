using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Reservations.Room
{
    public class RoomReservationService : IRoomReservationService
    {
        private readonly IMapper _mapper;
        private readonly IRoomReservationRepository _roomReservationRepository;

        public RoomReservationService(IRoomReservationRepository roomReservationRepository, IMapper mapper)
        {
            _roomReservationRepository = roomReservationRepository;
            _mapper = mapper;
        }

        public async Task ReserveRoom(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime)
        {
            await _roomReservationRepository.AddAsync(reservationId, userId, roomId, startTime, endTime);
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
    }
}
