using ProjectCalculator.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
   public class DeskReservation
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid DeskId { get; set; }

        public User User { get; set; }
        public Desk Desk { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
