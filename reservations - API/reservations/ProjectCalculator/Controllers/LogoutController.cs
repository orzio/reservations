using Microsoft.AspNetCore.Authorization;
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

    public class LogoutController:ControllerBase
    {
        private readonly IRefreshService _refreshService;
        public LogoutController(IRefreshService refreshService)
        {
            _refreshService = refreshService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RefreshToken command)
        {
            await _refreshService.DeleteTokens(command.UserId);
            return Ok();
        }
    }
}
