using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IRoomReservationRepository
    {
        Task AddAsync(Guid reservationId,Guid userId, Guid roomId, DateTime startTime, DateTime endTime);
        Task DeleteAsync(Guid reservationId);
        Task UpdateAsync(Guid reservationId,DateTime startTime, DateTime endTime);
        Task<IEnumerable<RoomReservation>> GetAllAsync();
        Task<RoomReservation> GetAsync(Guid id);
    }
}
