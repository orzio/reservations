using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
   public interface IDeskReservationRepository:IRepository
    {
        Task AddAsync(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime);
        Task DeleteAsync(Guid reservationId);
        Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime);
        Task<IEnumerable<DeskReservation>> GetAllAsync();
        Task<DeskReservation> GetAsync(Guid id);
        Task<IEnumerable<DeskReservation>> GetReservationByDeskIdAsync(Guid deskId);
    }
}
