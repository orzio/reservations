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
        private readonly IList<RoomReservation> _roomReservations;

        public EventCoversOther(DateTime start, DateTime end, IList<RoomReservation> roomReservations)
        {
            _start = start;
            _end= end;
            _roomReservations = roomReservations;
        }

        public bool Verify()
        {
            var reservation = _roomReservations.FirstOrDefault(x => _start <= x.StartDate && _end >= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}

