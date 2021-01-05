using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
    public class PhotoDto
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid OfficeId { get; set; }
        public bool IsMain { get; set; }
        public string PhotoUrl { get; set; }
    }
}
