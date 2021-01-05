using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories.Photos
{
    public class PhotoRepository:IPhotoRepository
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IRoomRepository _roomRepository;

        public PhotoRepository(DataContext context, IWebHostEnvironment env, IRoomRepository roomRepository)
        {
            _context = context;
            _webHostEnvironment = env;
            _roomRepository = roomRepository;
        }

        public async Task<Photo> AddPhoto(Guid id, Guid roomId, Guid officeId, IFormFile file)
        {
            var currentRoom = await _roomRepository.GetAsync(roomId);

            var filename = id.ToString() + '.' + file.FileName.Split('.')[1];
            var savePath = Path.Combine(_webHostEnvironment.ContentRootPath,"wwwroot", "images", filename);

            if (file.Length > 0)
            {
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            var photoUrl = $@"http://localhost:44310/images/{filename}";
            var photo = new Photo()
            {
                OfficeId = officeId,
                RoomId = roomId,
                PhotoUrl = photoUrl,
                Id = id
            };


            if (!currentRoom.Photos.Any(x => x.IsMain))
                photo.IsMain = true;

            currentRoom.Photos.Add(photo);
            await _context.Photos.AddAsync(photo);
            await _context.SaveChangesAsync();
            return photo;
        }


        public async Task<Photo> GetPhoto(Guid id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(Guid roomId)
        {
            var room = await _roomRepository.GetAsync(roomId);
            var photos = room.Photos;
            return photos;
        }

        public async Task RemovePhoto(Guid photoId)
        {
            var photo = await GetPhoto(photoId);
            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();
        }

        public async Task SetMain(Guid roomId, Guid id)
        {
            var currentMain = await _context.Photos.Where(x => x.RoomId == roomId).FirstOrDefaultAsync(x => x.IsMain);
            currentMain.IsMain = false;
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            photo.IsMain = true;
            await _context.SaveChangesAsync();
        }
    }
}
