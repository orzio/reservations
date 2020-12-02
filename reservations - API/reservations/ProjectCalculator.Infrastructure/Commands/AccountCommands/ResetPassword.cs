using Reservations.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.AccountCommands
{
    public class ResetPassword : ICommand
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
