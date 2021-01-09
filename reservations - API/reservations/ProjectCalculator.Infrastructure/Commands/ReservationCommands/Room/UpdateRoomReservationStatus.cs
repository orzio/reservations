using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Room
{
    public class UpdateRoomReservationStatus:ICommand
    {
        public Guid Id { get; set; }
        public int Status { get; set; }
    }
}
