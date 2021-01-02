using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public class EventEndsWithinOther : IReservationValidator
    {
        private readonly IList<RoomReservation> _roomReservations;
        private readonly DateTime _end;
        public EventEndsWithinOther(DateTime end, IList<RoomReservation> roomReservations)
        {
            _end = end;
            _roomReservations = roomReservations;
        }

        public bool Verify()
        {
            var reservation = _roomReservations.FirstOrDefault(x => _end >= x.StartDate && _end <= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}
