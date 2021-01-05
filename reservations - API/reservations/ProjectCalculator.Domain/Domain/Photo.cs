using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Photo
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        public string PhotoUrl { get; set; }
        public Guid OfficeId { get; set; }
        public bool IsMain { get; set; }
    }
}
