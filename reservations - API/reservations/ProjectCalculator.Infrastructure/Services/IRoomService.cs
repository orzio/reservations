using ProjectCalculator.Infrastructure;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IRoomService:IService
    {
        Task<RoomDto> GetAsync(Guid id);
        Task<IEnumerable<RoomDto>> BrowseAsync();
        Task CreateRoom(Guid officeId, Guid deskId, string name);
        Task RemoveRoom(Guid deskId);
    }
}
