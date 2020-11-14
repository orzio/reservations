using ProjectCalculator.Infrastructure;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IDeskService:IService
    {
        Task<DeskDto> GetAsync(Guid id);
        Task<IEnumerable<DeskDto>> BrowseAsync();
        Task CreateDesk(Guid officeId, Guid deskId, string name, int seats);
        Task RemoveDesk(Guid deskId);
        Task<IEnumerable<DeskDto>> GetDesksByOfficeIdAsync(Guid officeId);
    }
}
