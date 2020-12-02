using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IOfficeRepository:IRepository
    {
        Task AddAsync(Office office);
        Task DeleteAsync(Guid officeID);
        Task UpdateAsync(Office office);
        Task<IEnumerable<Office>> GetAllAsync();
        Task<Office> GetAsync(Guid officeId);
        Task<IEnumerable<Office>> GetUsersOfficeAsync(Guid userId);
        Task<IEnumerable<Office>> GetOfficesWithDesksInCity(string city);
        Task<IEnumerable<Office>> GetOfficesWithRoomsInCity(string city);
    }
}
