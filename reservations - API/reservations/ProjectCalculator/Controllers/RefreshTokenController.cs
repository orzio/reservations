using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RefreshTokenController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IRefreshService _refreshService;
        public RefreshTokenController(IUserService userService, ICommandDispatcher commandDispatcher, IRefreshService refreshService)
        {
            _userService = userService;
            _commandDispatcher = commandDispatcher;
            _refreshService = refreshService;
        }
        [HttpPost]
        public async Task<IActionResult> RefreshToken(RefreshToken refreshTokenCommand)
        {
            await _commandDispatcher.DispatchAsync(refreshTokenCommand);
            var token = await _refreshService.GetToken(refreshTokenCommand.UserId);
            return Ok(token);
        }
    }
}
