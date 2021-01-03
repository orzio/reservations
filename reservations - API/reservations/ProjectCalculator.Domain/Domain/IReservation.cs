using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public interface IReservation
    {
        public Guid Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
