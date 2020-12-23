using Reservations.Core.Domain;
using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Desk
{
    public class CreateDeskReservation:ICommand
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid DeskId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
