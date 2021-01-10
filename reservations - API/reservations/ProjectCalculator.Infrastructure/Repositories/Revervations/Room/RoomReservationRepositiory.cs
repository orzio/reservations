using Microsoft.EntityFrameworkCore;
using Reservations.Api.Repositories;
using Reservations.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Reservations.Infrastructure.Helpers;

namespace Reservations.Infrastructure.Repositories.Revervations.Room
{
    public class RoomReservationRepositiory : IRoomReservationRepository
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IOfficeRepository _officeRepository;
        public RoomReservationRepositiory(DataContext dataContext, IUserRepository userRepository, IOfficeRepository officeRepository)
        {
            _context = dataContext;
            _userRepository = userRepository;
            _officeRepository = officeRepository;
        }

        public async Task AddAsync(Guid reservationId, Guid userId, Guid roomId, DateTime startTime, DateTime endTime)
        {
            using (var transaction = _context.Database.BeginTransaction(System.Data.IsolationLevel.Serializable))
            {
                try
                {
                    var reservationsExists = _context.RoomReservations.Where(x => x.RoomId == roomId)
                        .Where(x => x.Status !=(int)ReservationStatus.Rejected).Any(x => endTime >= x.StartDate   && startTime <= x.EndDate);
                    if (reservationsExists)
                    {
                        //TODO NEW exception Class
                        throw new Exception();
                    }
                    var join = new RoomReservation()
                    {
                        Id = reservationId,
                        UserId = userId,
                        RoomId = roomId,
                        StartDate = startTime,
                        EndDate = endTime,
                        User = _context.Users.Find(userId),
                        Status = (int)ReservationStatus.WatingForApproval
                    };

                    await _context.RoomReservations.AddAsync(join);
                    await _context.SaveChangesAsync();
                    transaction.Commit();

                }
                //TOTO add specific exceptions)
                catch (Exception e)
                {
                    transaction.Rollback();
                    throw new Exception();
                }
            }


        }
    
  

public async Task DeleteAsync(Guid reservationId)
        {
            var reservation = await GetAsync(reservationId);
            _context.Remove(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoomReservation>> GetAllAsync()
        => await _context.RoomReservations.Include(x => x.Room).ThenInclude(x => x.Photos).ToListAsync();

        public async Task<RoomReservation> GetAsync(Guid id)
            => await _context.RoomReservations.SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime)
        {
            var reservation = await GetAsync(reservationId);
            reservation.StartDate = startTime;
            reservation.EndDate = endTime;
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<RoomReservation>> GetReservationByRoomIdAsync(Guid roomId)
            => await _context.RoomReservations.Where(x => x.RoomId == roomId).ToListAsync();

        public async Task<IEnumerable<RoomReservation>> GetReservationByUserIdAsync(Guid userId)
            => await _context.RoomReservations.Where(x => x.UserId == userId)
            .Include(x => x.Room)
            .ThenInclude(x => x.Photos)
             .Include(x => x.Room).ThenInclude(x => x.Office).ThenInclude(x => x.Address)
            .ToListAsync();

        public async Task<IEnumerable<RoomReservation>> GetAllReservationByManagerIdAsync(Guid managerId)
        {
            var offices = (await _officeRepository.GetUsersOfficeAsync(managerId)).Select(x => x.Id);
            var reservations = await _context.RoomReservations.Include(x => x.User).Include(res => res.Room).ToListAsync();
            var officeReservations = offices.SelectMany(x => reservations.Where(room => room.Room.OfficeId == x));
            return officeReservations;

        }

        public async Task<RoomReservation> GetAsyncWithFullInfo(Guid id)
             => await _context.RoomReservations
            .Include(x => x.User)
            .Include(x => x.Room)
            .ThenInclude(x => x.Office)
            .ThenInclude(x => x.Address)
            .SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateReservationStatus(Guid id, int status)
        {
            var reservation = await GetAsync(id);
            reservation.Status = status;
            await _context.SaveChangesAsync();
        }
    }
}
