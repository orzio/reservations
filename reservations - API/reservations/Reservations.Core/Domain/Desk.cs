using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Desk
    {

        public Desk()
        {
            UserDesks = new List<DeskReservation>();
        }
        public string Name { get;  set; }
        public Guid Id { get;  set; }
        public Guid OfficeId { get;  set; }
        public int Seats { get; set; }
        List<DeskReservation> UserDesks { get; set; }
    }
}
