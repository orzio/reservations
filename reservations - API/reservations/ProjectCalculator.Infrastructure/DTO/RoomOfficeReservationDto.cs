using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
    public class RoomOfficeReservationDto
    {
        public Guid Id { get; set; }
        public RoomDto RoomDto { get; set; }
        public Address OfficeAddress { get; set; }
        public string OfficeName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Status { get; set; }
    }
}
