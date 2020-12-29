using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.AccountCommands;
using Reservations.Infrastructure.Services.Account.Password;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChangePasswordController : ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        public ChangePasswordController(ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ChangePassword command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Ok();
        }
    }
}
