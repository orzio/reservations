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
    public class OfficesController : ControllerBase
    {
        private readonly IOfficeService _officeService;
        private readonly ICommandDispatcher _commandDispatcher;
        public OfficesController(IOfficeService officeService, ICommandDispatcher commandDispatcher)
        {
            _officeService = officeService;
            _commandDispatcher = commandDispatcher;
        }
        [HttpPost]
        public async Task<IActionResult> Post(CreateOffice command)
        {
           await _commandDispatcher.DispatchAsync(command);

            return Created($"offices/{command.UserId}",null);
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var offices = await _officeService.BrowseAsync();
            return Ok(offices);
        }
    }
}
