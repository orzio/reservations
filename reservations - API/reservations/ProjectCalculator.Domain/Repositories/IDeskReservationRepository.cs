using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
   public interface IDeskReservationRepository
    {
        Task AddAsync(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime);
        Task DeleteAsync(Guid reservationId);
        Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime);
        Task GetAllAsync();
        Task GetAsync();
    }
}
