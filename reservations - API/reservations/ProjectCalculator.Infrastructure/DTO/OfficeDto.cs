using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
   public class OfficeDto
    {
        public Guid Id { get; protected set; }
        public Guid UserId { get; protected set; }
        public Address Address { get; protected set; }
        public string Name { get; protected set; }
    }
}
