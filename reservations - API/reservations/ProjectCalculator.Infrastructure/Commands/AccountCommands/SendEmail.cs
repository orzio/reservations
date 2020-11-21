using ProjectCalculator.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.AccountCommands
{
    public class SendEmail : ICommand
    {
       public string Email { get; set; }
    }
}
