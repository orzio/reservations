using Microsoft.AspNetCore.Mvc;
using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DesksController:ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IDeskService _deskService;

        public DesksController(ICommandDispatcher commandDispatcher, IDeskService deskService)
        {
            _commandDispatcher = commandDispatcher;
            _deskService = deskService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateDesk command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Created($"desks/{command}", null);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var desks = await _deskService.BrowseAsync();
            return Ok(desks);
        }

    }
}
