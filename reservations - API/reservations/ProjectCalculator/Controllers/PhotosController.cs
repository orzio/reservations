using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.Photos;
using Reservations.Infrastructure.Services.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PhotosController: ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IPhotoService _photoService;

        public PhotosController(ICommandDispatcher commandDispatcher, IPhotoService photoService)
        {
            _commandDispatcher = commandDispatcher;
            _photoService = photoService;
        }

        [HttpPost("room/{id}")]
        public async Task<IActionResult> Post(Guid id, [FromForm]CreateRoomPhoto command)
        {
            command.RoomId = id;
            var photo = await _photoService.AddPhotoToRoom(Guid.NewGuid(), id, command.OfficeId, command.File);
            return Created($"photos/{command}", photo);
        }


        [HttpPost("room/{roomId}/main/{id}")]
        public async Task<IActionResult> Post(Guid roomId,Guid id)
        {
             await _photoService.SetAsMainPhoto(roomId,id);
            return Ok();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(Guid id)
        {
            var photo = await _photoService.GetRoomPhoto(id);
            return Ok(photo);
        }


        [HttpGet("room/photos/{id}")]
        public async Task<IActionResult> GetPhotos(Guid id)
        {
            var photo = await _photoService.GetRoomPhotos(id);
            return Ok(photo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _photoService.DeletePhoto(id);
            return NoContent();
        }
        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    //var desks = await _photoService.BrowseAsync();
        //    //return Ok(desks);
        //}

    }
}
