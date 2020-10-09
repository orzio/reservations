using ProjectCalculator.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IRoomRepository:IRepository
    {
        Task AddAsync(Room room);
        Task DeleteAsync(Guid id);
        Task UpdateAsync(Room room);
        Task<IEnumerable<Room>> GetAllAsync();
        Task<Room> GetAsync(Guid id);
    }
}
