using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Desk
{
    public class UpdateDeskReservation:ICommand
    {
        public Guid Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
