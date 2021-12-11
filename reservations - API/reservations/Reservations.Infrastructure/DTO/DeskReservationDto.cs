using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
    public class DeskReservationDto
    {
        public Guid Id;
        public Guid UserId { get; set; }
        public Guid DeskId { get; set; }
        public Guid OfficeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
