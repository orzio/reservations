using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.Room
{
    public class UpdateRoom:ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Seats { get; set; }
        public bool HasTV { get; set; }
        public bool HasWhiteBoard { get; set; }
        public bool HasProjector { get; set; }
        public string OtherEquipment { get; set; }
    }
}
