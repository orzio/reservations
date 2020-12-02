using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoomReservationController:ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        public RoomReservationController(ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
        }
        [HttpPost]
        public async Task<IActionResult> Post(CreateRoomReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);
            
            return Created($"roomreservations/{command.UserId}", null);
        }
    }
}
