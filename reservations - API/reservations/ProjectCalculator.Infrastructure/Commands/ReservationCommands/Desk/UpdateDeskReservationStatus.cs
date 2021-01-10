using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Desk
{
    public class UpdateDeskReservationStatus:ICommand
    {
        public Guid Id { get; set; }
        public int Status { get; set; }
    }
}
