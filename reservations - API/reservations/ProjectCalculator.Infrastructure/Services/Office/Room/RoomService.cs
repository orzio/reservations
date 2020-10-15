using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class RoomService : IRoomService
    {
        #region Fields
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;
        private readonly IOfficeRepository _officeRepository;

        public RoomService(IRoomRepository roomRepository, IMapper mapper, IOfficeRepository officeRepository)
        {
            _roomRepository = roomRepository;
            _officeRepository = officeRepository;
            _mapper = mapper;
        }
        #endregion

        public async Task<IEnumerable<RoomDto>> BrowseAsync()
        {
            var rooms = await _roomRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(rooms);
        }

        public async Task<RoomDto> GetAsync(Guid id)
        {
            var room = await _roomRepository.GetAsync(id);
            return _mapper.Map<Room, RoomDto>(room);
        }

        public async Task CreateRoom(Guid officeId, Guid roomId, string description, bool hasTV, bool hasWhiteBoard, bool hasProjector, int seats, string name)
        {
            var room = await _roomRepository.GetAsync(name);
            if (room != null)
            {
                throw new Exception($"Room: '{name}' already exists.");
            }

            room = new Room()
            {
                Id = roomId,
                OfficeId = officeId,
                Description = description,
                Seats = seats,
                HasTV = hasTV,
                HasProjector = hasProjector,
                HasWhiteBoard = hasWhiteBoard,
                Name = name
            };

            await _roomRepository.AddAsync(room);
        }

        public Task RemoveRoom(Guid deskId)
            => _roomRepository.DeleteAsync(deskId);
    
        public async Task UpdateRoom(Guid roomId, string Name, string description, string seats, bool hasTV, bool hasWhiteBoard, bool hasProjector)
        {
            var room = await _roomRepository.GetAsync(roomId);
            if(room == null)
            {
                throw new Exception($"room with Name: {Name} does not exists!");
            }

        }

    }
}
