using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.AccountCommands
{
    public class ChangePassword:ICommand
    {
        public Guid UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
