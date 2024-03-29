﻿using ProjectCalculator.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class RoomReservation
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
