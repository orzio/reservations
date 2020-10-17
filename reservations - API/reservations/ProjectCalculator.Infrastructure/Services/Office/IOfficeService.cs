using ProjectCalculator.Infrastructure;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IOfficeService:IService
    {
        Task CreateAsync(Guid officeId, Guid userId, string name, Address address);
        Task DeleteOffice(Guid officeId);
        Task UpdateOffice(Guid officeId,Guid userId, Address address, string name);
        Task<IEnumerable<OfficeDto>> BrowseAsync();
    }
}
