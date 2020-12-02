using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.ReservationCommands.Room
{
   public class CreateRoomReservation:ICommand
    {
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
