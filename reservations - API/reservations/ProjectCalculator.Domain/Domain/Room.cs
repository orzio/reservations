using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Room
    {

        public Room()
        {
            UserRooms = new List<UserRoom>();
        }
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid OfficeId { get; set; }
        List<UserRoom> UserRooms { get; set; }

    }
}
