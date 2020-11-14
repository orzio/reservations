using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<RoomDto>> GetRoomsByOfficeIdAsync(Guid officeId)
        {
            var rooms = await GetRoomsFromOffice(officeId);
            return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(rooms);
        }

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

        public async Task CreateRoom(Guid officeId, Guid roomId, string description, bool hasTV, bool hasWhiteBoard, bool hasProjector, int seats, string name, string otherEquipment)
        {
            var rooms = await GetRoomsFromOffice(officeId);
            var room = rooms.SingleOrDefault(x => x.Name == name);

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
                Name = name,
                OtherEquipment = otherEquipment
            };

            await _roomRepository.AddAsync(room);
        }

        public Task RemoveRoom(Guid deskId)
            => _roomRepository.DeleteAsync(deskId);

        public async Task UpdateRoom(Guid roomId, string name, string description, int seats, bool hasTV, bool hasWhiteBoard, bool hasProjector, string otherEquipment)
        {
            var room = await _roomRepository.GetAsync(roomId);
            if (room == null)
            {
                throw new Exception($"room with Name: {name} does not exists!");
            }
            room.Description = description;
            room.HasProjector = hasProjector;
            room.HasTV = hasTV;
            room.HasWhiteBoard = hasWhiteBoard;
            room.Id = roomId;
            room.Name = name;
            room.OtherEquipment = otherEquipment;
            room.Seats = seats;

            await _roomRepository.UpdateAsync(room);

        }

        private async Task<IEnumerable<Room>> GetRoomsFromOffice(Guid officeId)
        {
            var office = await _officeRepository.GetAsync(officeId);
            return office.Rooms;
        }

    }
}
