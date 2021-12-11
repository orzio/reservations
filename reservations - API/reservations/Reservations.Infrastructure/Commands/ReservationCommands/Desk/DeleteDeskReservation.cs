using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Desk
{
    public class DeleteDeskReservation:ICommand
    {
        public Guid Id { get; set; }
    }
}
