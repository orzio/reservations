using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public class EventCoversOther : IReservationValidator
    {
        private readonly DateTime _start;
        private readonly DateTime _end;
        private readonly IList<IReservation> _reservations;

        public EventCoversOther(DateTime start, DateTime end, IList<IReservation> reservations)
        {
            _start = start;
            _end= end;
            _reservations = reservations;
        }

        public bool Verify()
        {
            var reservation = _reservations.FirstOrDefault(x => _start <= x.StartDate && _end >= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}

