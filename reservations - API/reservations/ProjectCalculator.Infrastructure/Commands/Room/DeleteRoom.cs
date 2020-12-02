using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.Room
{
    public class DeleteRoom:ICommand
    {
        public Guid Id { get; set; }
    }
}
