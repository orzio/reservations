using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Room
{
    public class DeleteRoomCommandHandler : ICommandHandler<DeleteRoom>
    {
        private readonly IRoomService _roomService;

        public DeleteRoomCommandHandler(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public async Task HandleAsync(DeleteRoom command)
        {
            await _roomService.RemoveRoom(command.Id);
        }
    }
}
