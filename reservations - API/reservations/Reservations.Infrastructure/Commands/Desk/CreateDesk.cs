using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands
{
    public class CreateDesk:ICommand
    {
        public string Name { get; set; }
        public Guid OfficeId { get; set; }
        public int Seats { get; set; }
    }
}
