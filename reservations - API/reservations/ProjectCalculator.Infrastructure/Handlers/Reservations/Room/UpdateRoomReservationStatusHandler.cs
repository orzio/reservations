using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Room
{
    public class UpdateRoomReservationStatusHandler : ICommandHandler<UpdateRoomReservationStatus>
    {

        private readonly IRoomReservationService _roomReservationService;

        public UpdateRoomReservationStatusHandler(IRoomReservationService roomReservationService)
        {
            _roomReservationService = roomReservationService;
        }

        public async Task HandleAsync(UpdateRoomReservationStatus command)
        {
            await _roomReservationService.UpdateReservationStatus(command.Id, command.Status);
        }
    }
}
