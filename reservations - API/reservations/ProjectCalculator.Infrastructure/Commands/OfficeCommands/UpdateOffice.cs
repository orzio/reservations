using ProjectCalculator.Infrastructure.Commands;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.OfficeCommands
{
    public class UpdateOffice:ICommand
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } 
        public Address Address {get;set; }
        public string Name{ get;set;}
        public string Description { get; set; }
    }
}
