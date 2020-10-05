using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Desk
    {
        public string Name { get; protected set; }
        public Guid Id { get; protected set; }
        public Guid OfficeId { get; protected set; }
    }
}
