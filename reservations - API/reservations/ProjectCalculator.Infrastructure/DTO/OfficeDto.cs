using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
   public class OfficeDto
    {
        public Guid Id { get;  set; }
        public Guid UserId { get;  set; }
        public Address Address { get;  set; }
        public string Name { get;  set; }
        public string Description { get; set; }
        public List<RoomDto> Rooms { get;  set; }
        public List<DeskDto> Desks { get;  set; }
    }
}
