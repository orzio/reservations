using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
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
        private readonly IDeskReservationService _deskReservationService;
        public DeskReservationsController(ICommandDispatcher commandDispatcher, IDeskReservationService deskReservationService)
        {
            _commandDispatcher = commandDispatcher;
            _deskReservationService = deskReservationService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateDeskReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);

            return Created($"deskreservations/{command.UserId}", null);
        }

        [HttpGet("{deskId}")]
        public async Task<IActionResult> Get(Guid deskId)
        => Ok(await _deskReservationService.GetDeskReservationsAsync(deskId));


    }
}
