using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class RoomReservationHandler : ICommandHandler<CreateRoomReservation>
    {
        private readonly IRoomReservationService _roomReservationService;

        public RoomReservationHandler(IRoomReservationService roomReservationService)
        {
            _roomReservationService = roomReservationService;
        }

        public async Task HandleAsync(CreateRoomReservation command)
        {
            //await _roomReservationService.
        }
    }
}
