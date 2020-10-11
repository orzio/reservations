using Microsoft.EntityFrameworkCore;
using ProjectCalculator.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories
{
    public class DeskRepository : IDeskRepository
    {
        private readonly DataContext _context;
        public DeskRepository(DataContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Desk desk)
        {
            await _context.Desks.AddAsync(desk);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var desk = await GetAsync(id);
            _context.Desks.Remove(desk);
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<Desk>> GetAllAsync()
            => await _context.Desks.ToListAsync();

        public async Task<Desk> GetAsync(Guid id)
            => await _context.Desks.SingleOrDefaultAsync(x => x.Id == id);

        public async Task<Desk> GetAsync(string name)
            => await _context.Desks.SingleOrDefaultAsync(x => x.Name == name);

        public async Task UpdateAsync(Desk desk)
        {
            _context.Desks.Update(desk);
            await _context.SaveChangesAsync();
        }
    }
}
