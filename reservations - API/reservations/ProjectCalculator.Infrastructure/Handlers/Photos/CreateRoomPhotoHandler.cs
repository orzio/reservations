using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.Photos;
using Reservations.Infrastructure.Services.Photos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Photos
{
    public class CreateRoomPhotoHandler : ICommandHandler<CreateRoomPhoto>
    {
        private readonly IPhotoService _photoService;

        public CreateRoomPhotoHandler(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        public async Task HandleAsync(CreateRoomPhoto command)
        {
            await _photoService.AddPhotoToRoom(Guid.NewGuid(), command.RoomId, command.OfficeId, command.File);
        }
    }
}
