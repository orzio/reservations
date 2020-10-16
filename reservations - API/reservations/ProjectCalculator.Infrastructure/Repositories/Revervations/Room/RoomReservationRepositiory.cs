using Microsoft.EntityFrameworkCore;
using ProjectCalculator.Api.Repositories;
using ProjectCalculator.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Repositories.Revervations.Room
{
    public class RoomReservationRepositiory : IRoomReservationRepository
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        public RoomReservationRepositiory(DataContext dataContext, IUserRepository userRepository)
        {
            _context = dataContext;
            _userRepository = userRepository;
        }

        public async Task AddAsync(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime)
        {
            var user = await _userRepository.GetAsync(userId);
            var join = new RoomReservation()
            {
                Id = reservationId,
                UserId = userId,
                RoomId = roomId,
                StartDate = startTime,
                EndDate = endTime,
                User = user
            };

            await _context.RoomReservations.AddAsync(join);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid reservationId)
        {
            var reservation = await GetAsync(reservationId);
            _context.Remove(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoomReservation>> GetAllAsync()
        => await _context.RoomReservations.ToListAsync();

        public async Task<RoomReservation> GetAsync(Guid id)
            => await _context.RoomReservations.SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime)
        {
            var reservation = await GetAsync(reservationId);
            reservation.StartDate = startTime;
            reservation.EndDate = endTime;
            await _context.SaveChangesAsync();
        }
    }
}
