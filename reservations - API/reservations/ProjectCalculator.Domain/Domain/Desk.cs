using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Desk
    {

        public Desk()
        {
            UserDesks = new List<UserDesk>();
        }
        public string Name { get; protected set; }
        public Guid Id { get; protected set; }
        public Guid OfficeId { get; protected set; }
        List<UserDesk> UserDesks { get; set; }
    }
}
