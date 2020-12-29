using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Room
    {
        public Room()
        {
            UserRooms = new List<RoomReservation>();
        }
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid OfficeId { get; set; }
        public string Description { get; set; }
        public int Seats { get; set; }
        public bool HasTV { get; set; }
        public bool HasWhiteBoard { get; set; }
        public bool HasProjector { get; set; }
        public string OtherEquipment { get; set; }

        List<RoomReservation> UserRooms { get; set; }
        public Office Office { get; set; }
    }
}
