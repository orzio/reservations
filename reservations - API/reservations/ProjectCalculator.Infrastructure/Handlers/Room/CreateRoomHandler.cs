using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Room
{
    public class CreateRoomHandler : ICommandHandler<CreateRoom>
    {
        private readonly IRoomService _roomService;

        public CreateRoomHandler(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public async Task HandleAsync(CreateRoom command)
        {
            await _roomService.CreateRoom(command.OfficeId, Guid.NewGuid(), command.Description, command.HasTV, command.HasWhiteBoard, command.HasProjector, command.Seats, command.Name,command.OtherEquipment);
        }
    }
}
