using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.OfficeCommands;
using Reservations.Infrastructure.Services;
using Reservations.Infrastructure.Services.Email;
using System;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class OfficesController : ControllerBase
    {
        private readonly IOfficeService _officeService;
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IEmailService _emailService;
        public OfficesController(IOfficeService officeService, ICommandDispatcher commandDispatcher, IEmailService emailService)
        {
            _officeService = officeService;
            _commandDispatcher = commandDispatcher;
            _emailService = emailService;
        }
        [HttpPost]
        public async Task<IActionResult> Post(CreateOffice command)
        {
            await _commandDispatcher.DispatchAsync(command);

            return Created($"offices/{command.UserId}", null);
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var offices = await _officeService.BrowseAsync();
            return Ok(offices);
        }

        [Authorize(Policy = "manager")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult>GetUserOffices([FromRoute]Guid userId)
        {
            var offices = await _officeService.GetOfficesByUserId(userId);
            return Ok(offices);
        }

        [HttpGet("desks/city/{name}")]
        public async Task<IActionResult>GetOfficesWithDesksInCity(string name)
        {
            var offices = await _officeService.GetOfficesWithDeskByCity(name);
            return Ok(offices);
        }

        [HttpGet("rooms/city/{name}")]
        public async Task<IActionResult> GetOfficesWithRoomsInCity(string name)
        {
            var offices = await _officeService.GetOfficesWithRoomsByCity(name);
            return Ok(offices);
        }



        [Authorize(Policy = "manager")]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateOffice command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return NoContent();
        }

        [Authorize(Policy = "manager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _officeService.DeleteOffice(id);
            //await _commandDispatcher.DispatchAsync(command);
            return NoContent();
        }
    }
}
