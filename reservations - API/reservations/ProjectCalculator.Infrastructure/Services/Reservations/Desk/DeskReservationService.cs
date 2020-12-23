using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class DeskReservationService : IDeskReservationService
    {
        private readonly IDeskReservationRepository _deskReservationRepository;
        private readonly IMapper _mapper;

        public DeskReservationService(IDeskReservationRepository deskReservationRepository, IMapper mapper)
        {
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

        public async Task RemoveReservation(Guid reservationId)
        {
            await _deskReservationRepository.DeleteAsync(reservationId);
        }

        public async Task ReserveDesk(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
            await _deskReservationRepository.AddAsync(reservationId, userId, deskId, startTime, endTime);
        }

        public async Task UpdateReservation(Guid reservationId, DateTime start, DateTime end)
        {
            await _deskReservationRepository.UpdateAsync(reservationId, start, end);
        }


    }
}
