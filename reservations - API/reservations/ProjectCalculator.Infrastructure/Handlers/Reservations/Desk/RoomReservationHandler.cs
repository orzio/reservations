using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class RoomReservationHandler : ICommandHandler<CreateRoomReservation>
    {
        public Task HandleAsync(CreateRoomReservation command)
        {
            throw new NotImplementedException();
        }
    }
}
