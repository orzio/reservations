using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.OfficeCommands
{
    public class GetDesksInCity:ICommand
    {
        public string Name { get; set; }
    }
}
