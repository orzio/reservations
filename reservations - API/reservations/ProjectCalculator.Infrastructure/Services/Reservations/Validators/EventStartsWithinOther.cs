using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public class EventStartsWithinOther : IReservationValidator
    {
        private readonly IList<IReservation> _reservations;
        private readonly DateTime _start;
        public EventStartsWithinOther(DateTime start, List<IReservation> reservations)
        {
            _start = start;
            _reservations = reservations;
        }


        public bool Verify()
        {
            var reservation = _reservations.FirstOrDefault(x => _start >= x.StartDate && _start <= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}
