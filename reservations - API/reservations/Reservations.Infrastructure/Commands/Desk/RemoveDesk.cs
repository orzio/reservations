﻿using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.Desk
{
    public class RemoveDesk:ICommand
    {
        public Guid DeskId { get; set; }
    }
}
