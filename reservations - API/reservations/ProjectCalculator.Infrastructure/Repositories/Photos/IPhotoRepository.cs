using Microsoft.AspNetCore.Http;
using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories.Photos
{
    public interface IPhotoRepository:IRepository
    {
        Task<Photo> AddPhoto(Guid id, Guid roomId, Guid officeId, IFormFile file);
        Task<Photo> GetPhoto(Guid id);
        Task RemovePhoto(Guid photoId);
        Task<IEnumerable<Photo>> GetPhotos(Guid roomId);
        Task SetMain(Guid roomId, Guid id);
    }

}
