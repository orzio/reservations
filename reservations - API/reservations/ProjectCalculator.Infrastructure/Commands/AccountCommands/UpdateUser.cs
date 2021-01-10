using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.AccountCommands
{
    public class UpdateUser:ICommand
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
