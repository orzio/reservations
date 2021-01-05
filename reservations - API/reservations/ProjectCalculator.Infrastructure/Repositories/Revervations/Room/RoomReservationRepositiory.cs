using Microsoft.EntityFrameworkCore;
using Reservations.Api.Repositories;
using Reservations.Infrastructure.Data;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
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
            using var transaction = _context.Database.BeginTransaction();
            _context.Database.ExecuteSqlCommand(
        "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
            try
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

                var amout = await _context.SaveChangesAsync();
                    try
                    {
                transaction.Commit();

                    }

                catch(Exception e)
                {
                    throw new Exception();
                }
            }

            catch (Exception e)
            {
                transaction.Rollback();
            }
        }
                //var reservations = (await GetReservationByRoomIdAsync(roomId)).Cast<IReservation>().ToList();
                //var validators = new List<IReservationValidator>()
                //{
                //    new EventStartsWithinOther(startTime, reservations),
                //    new EventEndsWithinOther(endTime, reservations),
                //    new EventCoversOther(startTime, endTime, reservations),
                //};

                //foreach (var validator in validators)
                //{
                //    if (!validator.Verify())
                //    {
                //        throw new Exception("Cannot add reservation");
                //    }
                //}


                // var commandTest = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE BEGIN TRANSACTION Transaction4 INSERT INTO [resdb-2].[RoomReservations] VALUES(@Id, @userId,@roomId, @startDate, @endDate) COMMIT";

            // var p1 = new SqlParameter("@Id", join.Id);
            // var p2 = new SqlParameter("@userId", userId);
            // var p3 = new SqlParameter("@roomId", roomId);
            // var p4 = new SqlParameter("@startDate", startTime);
            // var p5 = new SqlParameter("@endDate", endTime);

            //_context.Database.ExecuteSqlCommand(commandTest, p1,p2,p3,p4,p4);
            //var res = await _context.RoomReservations.AddAsync(join);
            //await _context.SaveChangesAsync();
            //transaction.Commit();
        
            //}catch(Exception e)
            //{
            //    var msg = e.Message;
            //}
                //var reservations = (await GetReservationByRoomIdAsync(roomId)).ToList();
                //var validators = new List<IReservationValidator>()
                //{
                //    new EventStartsWithinOther(startTime, reservations),
                //    new EventEndsWithinOther(endTime, reservations),
                //    new EventCoversOther(startTime, endTime, reservations),
                //};

                //foreach (var validator in validators)
                //{
                //    if (!validator.Verify())
                //    {
                //        throw new Exception("Cannot add reservation");
                //    }
                //}

            //}

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
        public async Task<IEnumerable<RoomReservation>> GetReservationByRoomIdAsync(Guid roomId)
            => await _context.RoomReservations.Where(x => x.RoomId == roomId).ToListAsync();

        public async Task<IEnumerable<RoomReservation>> GetReservationByUserIdAsync(Guid userId)
            => await _context.RoomReservations.Where(x => x.UserId == userId)
            .Include(x => x.Room)
            .ThenInclude(x => x.Office).ThenInclude(x => x.Address)
            .ToListAsync();

    }
}
