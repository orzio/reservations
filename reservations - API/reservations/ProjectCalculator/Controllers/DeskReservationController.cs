using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using Reservations.Infrastructure.SignalR;
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
        private IHubContext<ReservationHub> _hub;
        public DeskReservationsController(ICommandDispatcher commandDispatcher, IHubContext<ReservationHub> hub, IDeskReservationService deskReservationService)
        {
            _commandDispatcher = commandDispatcher;
            _deskReservationService = deskReservationService;
            _hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateDeskReservation command)
        {
            await _commandDispatcher.DispatchAsync(command);
            await _hub.Clients.All.SendAsync("deskEventsChanged", new { deskId = command.DeskId });
            return Created($"deskreservations/{command.UserId}", null);
        }

        [HttpGet("{deskId}")]
        public async Task<IActionResult> Get(Guid deskId)
        => Ok(await _deskReservationService.GetDeskReservationsAsync(deskId));


        [HttpPut]
        public async Task<IActionResult> Put(UpdateDeskReservation command)
        {
            var deskId = await GetDeskId(command.Id);
            await _commandDispatcher.DispatchAsync(command);
            await _hub.Clients.All.SendAsync("deskEventsChanged", new { deskId = deskId });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deskId = await GetDeskId(id);
            await _deskReservationService.RemoveReservation(id);
            await _hub.Clients.All.SendAsync("deskEventsChanged", new { deskId = deskId });
            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserReservations(Guid userId)
            => Ok(await _deskReservationService.GetDeskWithOfficeReservationsAsync(userId));



        [HttpGet("manager/{managerId}")]
        public async Task<IActionResult> GetReservationForManager(Guid managerId)
            => Ok(await _deskReservationService.GetAllReservationForManager(managerId));


        [HttpPut("manager/updatestatus/{reservationId}")]
        public async Task<IActionResult> PutStatusForUserReservation(UpdateDeskReservationStatus command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Ok();
        }


        private async Task<Guid> GetDeskId(Guid reservationId)
        {
            var reservation = await _deskReservationService.GetAsync(reservationId);
            return reservation.DeskId;
        }
    }
}
