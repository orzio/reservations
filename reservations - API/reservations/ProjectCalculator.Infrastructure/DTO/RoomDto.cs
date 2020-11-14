using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
   public class RoomDto
    {
        public Guid Id { get; set; }
        public Guid OfficeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Seats { get; set; }
        public bool HasTV { get; set; }
        public bool HasWhiteBoard { get; set; }
        public bool HasProjector { get; set; }
        public string OtherEquipment { get; set; }
    }
}
