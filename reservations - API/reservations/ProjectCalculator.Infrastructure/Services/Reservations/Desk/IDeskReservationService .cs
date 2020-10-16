using ProjectCalculator.Infrastructure;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IDeskReservationService :IService
    {
        Task ReserveDesk(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime);
        Task<IEnumerable<DeskReservationDto>> BrowseAsync();
        Task<DeskReservationDto> GetAsync(Guid reservationId);
        Task RemoveReservation(Guid reservationId);
        Task UpdateReservation(Guid reservationId, DateTime start, DateTime end);
    }
}
