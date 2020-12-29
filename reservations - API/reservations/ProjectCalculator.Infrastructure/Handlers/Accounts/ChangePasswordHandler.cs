using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services.Account.Password;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Accounts
{
    public class ChangePasswordHandler : ICommandHandler<ChangePassword>
    {
        private readonly IChangePasswordService _changePasswordService;

        public ChangePasswordHandler(IChangePasswordService changePasswordService)
        {
            _changePasswordService = changePasswordService;
        }

        public async Task HandleAsync(ChangePassword command)
        {
            await _changePasswordService.ResetPassword(command.CurrentPassword, command.NewPassword, command.UserId);
        }
    }
}
