using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class DeskReservationService : IDeskReservationService
    {
        private readonly IDeskReservationRepository _deskReservationRepository;

        public DeskReservationService(IDeskReservationRepository deskReservationRepository)
        {
            _deskReservationRepository = deskReservationRepository;
        }

        public async Task ReserveDesk(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
            await _deskReservationRepository.AddAsync(reservationId, userId, deskId, startTime, endTime);
        }
    }
}
