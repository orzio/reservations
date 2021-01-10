using Microsoft.EntityFrameworkCore;
using Reservations.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories
{
    public class OfficeRepository : IOfficeRepository
    {
        private readonly DataContext _context;

        public OfficeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Office office)
        {
            await _context.Offices.AddAsync(office);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid officeId)
        {
            var office = await GetAsync(officeId);
            _context.Offices.Remove(office);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Office>> GetAllAsync()
       => await _context.Offices
            .Include(c => c.Address)
            .Include(x => x.Rooms).ThenInclude(x => x.Photos)
            .Include(x => x.Desks)
            .ToListAsync();

        public async Task<Office> GetAsync(Guid officeId)
        => await _context.Offices
            .Include(x => x.Rooms).ThenInclude(x => x.Photos)
            .Include(x => x.Desks)
            .SingleOrDefaultAsync(x => x.Id == officeId);

        public async Task UpdateAsync(Office office)
        {
            var officeToUpdate = await _context.Offices.Include(x => x.Address).FirstOrDefaultAsync(x => x.Id == office.Id);
            officeToUpdate.Name = office.Name;
            officeToUpdate.Description = office.Description;
            officeToUpdate.Address.City = office.Address.City;
            officeToUpdate.Address.Street = office.Address.Street;
            officeToUpdate.Address.ZipCode = office.Address.ZipCode;
            officeToUpdate.PhoneNumber = office.PhoneNumber;
            officeToUpdate.Email = office.Email;

            _context.Offices.Update(officeToUpdate);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Office>> GetUsersOfficeAsync(Guid userId)
            => await _context.Offices.Where(x => x.UserId == userId)
            .Include(x=> x.Address)
            .Include(x => x.Rooms).ThenInclude(x => x.Photos)
            .Include(x => x.Desks).ToListAsync();

       public async Task<IEnumerable<Office>> GetOfficesWithDesksInCity(string city)
        {
            var offices = await _context.Offices
                .Include(x => x.Address)
                .Where(x => x.Address.City == city)
                .Include(x => x.Desks)
                .Where(x => x.Desks.Count >0)
                .ToListAsync();

            return offices;
        }


        public async Task<IEnumerable<Office>> GetOfficesWithRoomsInCity(string city)
        {
            var offices = await _context.Offices
                .Include(x => x.Address)
                .Where(x => x.Address.City == city)
                .Include(x => x.Rooms).ThenInclude(x => x.Photos)
                .Where(x => x.Rooms.Count > 0)
                .ToListAsync();

            return offices;
        }

    }
}
