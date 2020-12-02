using Reservations.Infrastructure;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IRoomReservationService : IService
    {
        Task ReserveRoom(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime);
        Task<IEnumerable<RoomReservationDto>> BrowseAsync();
        Task<RoomReservationDto> GetAsync(Guid reservationId);
        Task RemoveReservation(Guid reservationId);
        Task UpdateReservation(Guid reservationId, DateTime start, DateTime end);
    }
}
