using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
   public class RoomReservationForManagerDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string RoomName { get; set; }
        public string OfficeName { get; set; }
        public Guid RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Status { get; set; }
    }
}
