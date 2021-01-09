using Microsoft.EntityFrameworkCore;
using Reservations.Core.Domain;
using Reservations.Infrastructure.EF;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Reservations.Infrastructure.Data
{
    public class DataContext:DbContext
    {

        public DataContext(DbContextOptions<DataContext> options)
           : base(options) {

        }


        public static readonly ILoggerFactory ConsoleLoggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddFilter((category, level) =>
            category == DbLoggerCategory.Database.Command.Name
            && level == LogLevel.Information).AddConsole();
        });
       

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(ConsoleLoggerFactory);
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
                    .WithOne(e => e.Office).HasForeignKey(x => x.OfficeId)
                    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Address>().HasOne(x => x.Office)
                .WithOne(x => x.Address)
                .HasForeignKey<Address>(x => x.OfficeId)
                .OnDelete(DeleteBehavior.Cascade);


            //.WithOne(e => e.Office).HasForeignKey(x => x.OfficeId)
            //.OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Office>().HasMany(x => x.Desks)
                    .WithOne(e => e.Office);
            //modelBuilder.Entity<RoomReservation>(entity => entity.
            //                    HasCheckConstraint("CK_RoomReservations_StartDate", "X not between [StartDate] and [EndDate]"));
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos{ get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Office> Offices{ get; set; }
        public DbSet<Room> Rooms{ get; set; }
        public DbSet<Desk> Desks{ get; set; }
        public DbSet<DeskReservation> DeskReservations { get; set; }
        public DbSet<RoomReservation> RoomReservations { get; set; }
        public DbSet<Address> Addresses { get; set; }
       
    }
}
