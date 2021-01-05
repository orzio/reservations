using AutoMapper;
using Microsoft.AspNetCore.Http;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using Reservations.Infrastructure.Repositories.Photos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Photos
{
    public class PhotoService : IPhotoService
    {
        private readonly IPhotoRepository _photoRepository;
        private readonly IMapper _mapper;

        public PhotoService(IPhotoRepository photoRepository, IMapper mapper)
        {
            _photoRepository = photoRepository;
            _mapper = mapper;
        }

        public async Task<PhotoDto> AddPhotoToRoom(Guid id, Guid roomId, Guid officeId, IFormFile file)
        {
           var photo =  await _photoRepository.AddPhoto(id, roomId, officeId, file);
            return _mapper.Map<Photo, PhotoDto>(photo);
        }

        public async Task<PhotoDto> GetRoomPhoto(Guid photoId)
        {
            var photo = await _photoRepository.GetPhoto(photoId);
            return _mapper.Map<Photo, PhotoDto>(photo);
        }


        public async Task<IEnumerable<PhotoDto>> GetRoomPhotos(Guid photoId)
        {
            var photos = await _photoRepository.GetPhotos(photoId);
            return _mapper.Map< IEnumerable<Photo>, IEnumerable<PhotoDto>>(photos);
        }

        public async Task DeletePhoto(Guid photoId)
        {
            await _photoRepository.RemovePhoto(photoId);
        }

        public async Task SetAsMainPhoto(Guid roomId, Guid id)
         => await _photoRepository.SetMain(roomId, id);




    }
}
