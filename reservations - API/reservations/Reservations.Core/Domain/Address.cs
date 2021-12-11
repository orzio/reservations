using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Address
    {
        public Guid Id { get; set; }
        public string Street { get;  set; }
        public string City { get;  set; }
        public string ZipCode { get;  set; }
    }
}
