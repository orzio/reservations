using Reservations.Infrastructure;
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
        Task CreateRoom(Guid officeId, Guid roomId, string description, bool hasTV, bool hasWhiteBoard, bool hasProjector, int seats, string name, string otherEquipment);
        Task RemoveRoom(Guid roomId);
        Task UpdateRoom(Guid roomId, string name, string description, int seats, bool hasTV, bool hasWhiteBoard, bool hasProjector, string otherEquipment);
        Task<IEnumerable<RoomDto>> GetRoomsByOfficeIdAsync(Guid officeId);
    }
}
