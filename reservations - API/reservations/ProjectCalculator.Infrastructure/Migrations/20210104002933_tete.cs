using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class tete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"create or alter trigger test2 on RoomReservations
after Insert, update
as

if EXISTS(SELECT roomReservations.StartDate, roomreservations.EndDate, inserted.StartDate, inserted.EndDate

    FROM RoomReservations, inserted

    WHERE inserted.EndDate >= roomReservations.StartDate
    AND inserted.StartDate <= roomReservations.EndDate)


    begin
    SELECT roomReservations.StartDate, roomreservations.EndDate, inserted.StartDate, inserted.EndDate
    FROM RoomReservations,inserted
    WHERE inserted.EndDate >= roomReservations.StartDate
    AND inserted.StartDate <= roomReservations.EndDate;

            RAISERROR('*********************************************************************************************', 16, 1);
            rollback transaction
end");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"drop trigger test2");
        }
    }
}
