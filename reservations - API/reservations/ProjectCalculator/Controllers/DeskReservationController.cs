using Microsoft.AspNetCore.Mvc;
using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeskReservationsController : ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        public DeskReservationsController(ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
        }

        public async Task<IActionResult> Post(CreateDeskReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);

            return Created($"deskreservations/{command.UserId}", null);
        }
    }
}
