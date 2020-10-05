using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Address
    {
        public string Street { get; protected set; }
        public string City { get; protected set; }
        public string ZipCode { get; protected set; }
    }
}
