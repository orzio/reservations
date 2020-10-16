using Microsoft.EntityFrameworkCore;
using ProjectCalculator.Core.Domain;
using ProjectCalculator.Infrastructure.EF;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectCalculator.Infrastructure.Data
{
    public class DataContext:DbContext
    {

        public DataContext(DbContextOptions<DataContext> options)
           : base(options) {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
    //        optionsBuilder.UseSqlServer(
    //"Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = newDB");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //ef knows that these Id's are foreign Keys
            //modelBuilder.Entity<DeskReservations>().HasKey(x => new { x.UserId, x.DeskId });
            //modelBuilder.Entity<RoomReservations>().HasKey(x => new { x.UserId, x.RoomId });
            modelBuilder.Entity<Address>().ToTable("Addresses");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Office> Offices{ get; set; }
        public DbSet<Room> Rooms{ get; set; }
        public DbSet<Desk> Desks{ get; set; }
        public DbSet<DeskReservation> DeskReservations { get; set; }
        public DbSet<RoomReservation> RoomReservations { get; set; }
       
    }
}
