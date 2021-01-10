using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Users
{
   public class UpdateUserHandler:ICommandHandler<UpdateUser>
    {
        private readonly IUserService _userService;

        public UpdateUserHandler(IUserService userService) => _userService = userService;

        public async Task HandleAsync(UpdateUser command)
        {
           await _userService.UpdateUser(command.Id, command.FirstName, command.LastName, command.PhoneNumber);
        }
    }
}
