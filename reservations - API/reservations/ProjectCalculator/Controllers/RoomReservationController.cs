using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
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
        private readonly IRoomReservationService _roomReservationService;
        public RoomReservationController(ICommandDispatcher commandDispatcher, IRoomReservationService roomReservationService)
        {
            _commandDispatcher = commandDispatcher;
            _roomReservationService = roomReservationService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateRoomReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);
            
            return Created($"roomreservations/{command.UserId}", null);
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> Get(Guid roomId)
            => Ok(await _roomReservationService.GetRoomReservationsAsync(roomId));

        [HttpPut]
        public async Task<IActionResult> Put(UpdateRoomReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _roomReservationService.RemoveReservation(id);
            return NoContent();
        }

    }
}
