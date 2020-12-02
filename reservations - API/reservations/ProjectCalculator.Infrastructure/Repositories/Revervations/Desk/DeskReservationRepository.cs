using Microsoft.EntityFrameworkCore;
using Reservations.Api.Repositories;
using Reservations.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories.Revervations.Desk
{
    public class DeskReservationRepository : IDeskReservationRepository
    {
        private readonly DataContext _context;

        private readonly IUserRepository _userRepository;
        public DeskReservationRepository(DataContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task AddAsync(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
            var user = await _userRepository.GetAsync(userId);
            var join = new DeskReservation()
            {
                Id = reservationId,
                UserId = userId,
                DeskId = deskId,
                StartDate = startTime,
                EndDate = endTime,
                User = user,
            };

            await _context.DeskReservations.AddAsync(join);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid reservationId)
        {
            var reservation = await _context.DeskReservations.SingleOrDefaultAsync(x => x.Id == reservationId);
            _context.Remove(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DeskReservation>> GetAllAsync()
            => await _context.DeskReservations.ToListAsync();


        public async Task<DeskReservation> GetAsync(Guid id)
            => await _context.DeskReservations.SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime)
        {
            var reservation = await _context.DeskReservations.SingleOrDefaultAsync(x => x.Id == reservationId);
            reservation.StartDate = startTime;
            reservation.EndDate = endTime;

            await _context.SaveChangesAsync();
        }
    }
}
