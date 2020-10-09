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
        public string Name { get; protected set; }
        public Guid Id { get; protected set; }
        public Guid OfficeId { get; protected set; }
        List<UserRoom> UserRooms { get; set; }

    }
}
