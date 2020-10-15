using ProjectCalculator.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories.Revervations.Desk
{
    public class DeskReservationRepository : IDeskReservationRepository
    {
        private readonly DataContext _context;

        public DeskReservationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
            var join = new DeskReservations()
            {
                Id = reservationId,
                UserId = userId,
                DeskId = deskId
            };

            await _context.AddAsync(join);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(Guid reservationId)
        {
            throw new NotImplementedException();
        }

        public Task GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task GetAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime)
        {
            throw new NotImplementedException();
        }
    }
}
