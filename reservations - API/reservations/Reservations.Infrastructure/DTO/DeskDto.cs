using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
   public class DeskDto
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid OfficeId { get; set; }
        public int Seats { get; set; }
    }
}
