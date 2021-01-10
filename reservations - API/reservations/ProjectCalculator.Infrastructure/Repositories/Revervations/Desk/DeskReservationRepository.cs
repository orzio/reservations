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
using Reservations.Infrastructure.Helpers;

namespace Reservations.Infrastructure.Repositories.Revervations.Desk
{
    public class DeskReservationRepository : IDeskReservationRepository
    {
        private readonly DataContext _context;

        private readonly IUserRepository _userRepository;
        private readonly IOfficeRepository _officeRepository;
        public DeskReservationRepository(DataContext context, IUserRepository userRepository, IOfficeRepository officeRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _officeRepository = officeRepository;
        }

        public async Task AddAsync(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime)
        {
                using (var transaction = _context.Database.BeginTransaction(System.Data.IsolationLevel.Serializable))
                {
                    try
                    {
                        var reservationsExists = _context.DeskReservations.Where(x => x.DeskId == deskId)
                            .Where(x => x.Status != (int)ReservationStatus.Rejected).Any(x => endTime >= x.StartDate && startTime <= x.EndDate);
                        if (reservationsExists)
                        {
                            //TODO NEW exception Class
                            throw new Exception();
                        }
                       var join = new DeskReservation()
                       {
                           Id = reservationId,
                           UserId = userId,
                           DeskId = deskId,
                           StartDate = startTime,
                           EndDate = endTime,
                           User = _context.Users.Find(userId),
                           Status = (int)ReservationStatus.WatingForApproval
                       };

                        await _context.DeskReservations.AddAsync(join);
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

        public async Task<IEnumerable<DeskReservation>> GetReservationByDeskIdAsync(Guid deskId)
            => await _context.DeskReservations.Where(x => x.DeskId == deskId).ToListAsync();

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

        public async Task<DeskReservation> GetAsyncWithFullInfo(Guid id)
             => await _context.DeskReservations
            .Include(x => x.User)
            .Include(x => x.Desk)
            .ThenInclude(x => x.Office)
            .ThenInclude(x => x.Address)
            .SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateAsync(Guid reservationId, DateTime startTime, DateTime endTime)
        {
            var reservation = await _context.DeskReservations.SingleOrDefaultAsync(x => x.Id == reservationId);
            reservation.StartDate = startTime;
            reservation.EndDate = endTime;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DeskReservation>> GetReservationByUserIdAsync(Guid userId)
            => await _context.DeskReservations.Where(x => x.UserId == userId)
            .Include(x => x.Desk)
            .ThenInclude(x => x.Office).ThenInclude(x => x.Address)
            .ToListAsync();


        public async Task<IEnumerable<DeskReservation>> GetAllReservationByManagerIdAsync(Guid managerId)
        {
            var offices = (await _officeRepository.GetUsersOfficeAsync(managerId)).Select(x => x.Id);
            var reservations = await _context.DeskReservations.Include(x => x.User).Include(res => res.Desk).ToListAsync();
            var officeReservations = offices.SelectMany(x => reservations.Where(desk => desk.Desk.OfficeId == x));
            return officeReservations;

        }

        public async Task UpdateReservationStatus(Guid id, int status)
        {
            var reservation = await GetAsync(id);
            reservation.Status = status;
            await _context.SaveChangesAsync();
        }
    }
}
