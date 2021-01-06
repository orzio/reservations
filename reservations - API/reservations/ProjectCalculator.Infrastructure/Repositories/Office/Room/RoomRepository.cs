using Microsoft.EntityFrameworkCore;
using Reservations.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;

        public RoomRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Room room)
        {
            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var room = await GetAsync(id);
            _context.Remove(room);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Room>> GetAllAsync()
        => await _context.Rooms.Include(x => x.Photos).ToListAsync();

        public async Task<Room> GetAsync(Guid id)
        => await _context.Rooms.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Id == id);

        public async Task<Room> GetAsync(string name)
        => await _context.Rooms.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Name == name);

        public async Task UpdateAsync(Room room)
        {
            _context.Update(room);
            await _context.SaveChangesAsync();
        }
    }
}
