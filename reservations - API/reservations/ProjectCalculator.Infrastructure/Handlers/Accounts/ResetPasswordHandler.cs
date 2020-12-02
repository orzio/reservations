using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services.Account.Password;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Accounts
{
    public class ResetPasswordHandler : ICommandHandler<ResetPassword>
    {
        private readonly IForgotPasswordService _forgotPasswordService;
        public ResetPasswordHandler(IForgotPasswordService forgotPasswordService)
        {
            _forgotPasswordService = forgotPasswordService;
        }
        
        public async Task HandleAsync(ResetPassword command)
        {
            await _forgotPasswordService.ResetPassword(command.Token, command.NewPassword);
        }
    }
}
