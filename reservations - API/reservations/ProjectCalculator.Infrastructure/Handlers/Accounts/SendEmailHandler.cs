using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services.Account.Password;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Accounts
{
    public class SendEmailHandler : ICommandHandler<SendEmail>
    {
        private readonly IForgotPasswordService _forgotPasswordService;

        public SendEmailHandler(IForgotPasswordService forgotPasswordService)
        {
            _forgotPasswordService = forgotPasswordService;
        }

        public async Task HandleAsync(SendEmail command)
        {
            await _forgotPasswordService.SendResetToken(command.Email);
        }
    }
}
