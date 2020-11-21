using Microsoft.AspNetCore.Mvc;
using ProjectCalculator.Infrastructure.Commands;
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
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IForgotPasswordService _forgotPasswordService;
        private readonly ICommandDispatcher _commandDispatcher;
        public ForgotPasswordController(IForgotPasswordService forgotPasswordService, ICommandDispatcher commandDispatcher)
        {
            _forgotPasswordService = forgotPasswordService;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("SendEmail")]
        public async Task<IActionResult> Post(SendEmail command)
        {
            await _commandDispatcher.DispatchAsync(command);

            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPassword command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Ok();
        }

    }
}
