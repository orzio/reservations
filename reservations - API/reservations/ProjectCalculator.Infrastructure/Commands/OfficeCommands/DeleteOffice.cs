using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.OfficeCommands
{
    public class DeleteOffice:ICommand
    {
        public Guid Id { get; set; }
    }
}
