using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IDeskRepository:IRepository
    {
        Task AddAsync(Desk desk);
        Task DeleteAsync(Guid id);
        Task UpdateAsync(Desk desk);
        Task<IEnumerable<Desk>> GetAllAsync();
        Task<Desk> GetAsync(Guid id);
        Task<Desk> GetAsync(string name);
    }
}
