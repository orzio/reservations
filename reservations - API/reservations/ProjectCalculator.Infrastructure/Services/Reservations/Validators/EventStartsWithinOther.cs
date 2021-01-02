using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public class EventStartsWithinOther : IReservationValidator
    {
        private readonly IList<RoomReservation> _roomReservations;
        private readonly DateTime _start;
        public EventStartsWithinOther(DateTime start, IList<RoomReservation> roomReservations)
        {
            _start = start;
            _roomReservations = roomReservations;
        }


        public bool Verify()
        {
            var reservation =  _roomReservations.FirstOrDefault(x => _start >= x.StartDate && _start <= x.EndDate);
            return reservation == null ? true : false;
        }
    }
}
