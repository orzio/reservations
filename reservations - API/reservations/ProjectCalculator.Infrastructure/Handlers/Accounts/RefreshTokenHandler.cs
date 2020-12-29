using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class RefreshTokenHandler : ICommandHandler<RefreshToken>
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;
        private readonly IRefreshService _refreshService;

        public RefreshTokenHandler(IJwtService jwtService, IUserService userService, IRefreshService refreshService)
        {
            _jwtService = jwtService;
            _userService = userService;
            _refreshService = refreshService;
        }

        public async Task HandleAsync(RefreshToken command)
        {
            var userDto = (await _userService.GetAsync(command.UserId));
            var role = userDto.Role;
            var userName = $"{userDto.FirstName} {userDto.LastName}";
           var newToken = _jwtService.CreateToken(command.UserId, userName, role).Token;
           await _refreshService.UpdateTokenAsync(command.UserId, newToken, command.Refresh);
        }
    }
}
