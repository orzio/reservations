using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public class EventEndsWithinOther : IReservationValidator
    {
        private readonly IList<IReservation> _reservations;
        private readonly DateTime _end;
        public EventEndsWithinOther(DateTime end, IList<IReservation> reservations)
        {
            _end = end;
            _reservations = reservations;
        }

        public bool Verify()
        {
            var reservation = _reservations.FirstOrDefault(x => _end >= x.StartDate && _end <= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}
