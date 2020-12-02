using Reservations.Infrastructure;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IOfficeService : IService
    {
        Task CreateAsync(Guid officeId, Guid userId, string name, Address address, string Description);
        Task DeleteOffice(Guid officeId);
        Task UpdateOffice(Guid officeId, Guid userId, Address address, string name, string description);
        Task<IEnumerable<OfficeDto>> BrowseAsync();
        Task<OfficeDto> GetOffice(Guid officeId);
        Task<IEnumerable<OfficeDto>> GetOfficesByUserId(Guid userId);
        Task<IEnumerable<OfficeDto>> GetOfficesWithDeskByCity(string city);
        Task<IEnumerable<OfficeDto>> GetOfficesWithRoomsByCity(string city);
    }
}
