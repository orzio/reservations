using ProjectCalculator.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
   public class UserDesk
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid DeskId { get; set; }

        public User User { get; set; }
        public Desk Desk { get; set; }
    }
}
