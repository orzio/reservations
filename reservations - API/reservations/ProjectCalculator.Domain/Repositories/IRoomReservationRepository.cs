using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IRoomReservationRepository
    {
        Task AddAsync(Guid userId, Guid roomId, DateTime startTime, DateTime endTime);
        Task DeleteAsync(Guid reservationId);
        Task UpdateAsync(Guid reservationId,DateTime startTime, DateTime endTime);
        Task GetAllAsync();
        Task GetAsync();
    }
}
