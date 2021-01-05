using Microsoft.AspNetCore.Http;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Photos
{
    public interface IPhotoService:IService
    {
        Task<PhotoDto> AddPhotoToRoom(Guid id, Guid roomId, Guid officeId, IFormFile file);
        Task<PhotoDto> GetRoomPhoto(Guid photoId);
        Task<IEnumerable<PhotoDto>> GetRoomPhotos(Guid photoId);
        Task DeletePhoto(Guid photoId);
        Task SetAsMainPhoto(Guid roomId, Guid id);
    }
}
