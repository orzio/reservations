using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands
{
    public class CreateRoom:ICommand
    {
        public string Name { get; set; }
        public Guid OfficeId { get; set; }
        public string Description { get; set; }
        public int Seats { get; set; }
        public bool HasTV { get; set; }
        public bool HasWhiteBoard { get; set; }
        public bool HasProjector { get; set; }
    }
}
