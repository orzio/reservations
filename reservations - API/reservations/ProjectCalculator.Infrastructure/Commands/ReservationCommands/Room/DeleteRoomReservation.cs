using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Room
{
    public class DeleteRoomReservation:ICommand
    {
        public Guid Id { get; set; }
    }
}
