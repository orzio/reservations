using Microsoft.EntityFrameworkCore;
using Reservations.Core.Domain;
using Reservations.Infrastructure.EF;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Data
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
            //modelBuilder.Entity<Address>().ToTable("Addresses");
            modelBuilder.Entity<Office>().HasMany(x => x.Rooms)
                    .WithOne(e => e.Office);
            modelBuilder.Entity<Office>().HasMany(x => x.Desks)
                    .WithOne(e => e.Office);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Office> Offices{ get; set; }
        public DbSet<Room> Rooms{ get; set; }
        public DbSet<Desk> Desks{ get; set; }
        public DbSet<DeskReservation> DeskReservations { get; set; }
        public DbSet<RoomReservation> RoomReservations { get; set; }
        public DbSet<Address> Addresses { get; set; }
       
    }
}
