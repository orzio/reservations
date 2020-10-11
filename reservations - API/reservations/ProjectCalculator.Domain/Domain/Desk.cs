﻿using System;
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
        public string Name { get;  set; }
        public Guid Id { get;  set; }
        public Guid OfficeId { get;  set; }
        List<UserDesk> UserDesks { get; set; }
    }
}
