using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Room
{
    public class UpdateRoomCommandHandler : ICommandHandler<UpdateRoom>
    {
        private readonly IRoomService _roomService;

        public UpdateRoomCommandHandler(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public Task HandleAsync(UpdateRoom command)
        {
            throw new NotImplementedException();
        }
    }
}
