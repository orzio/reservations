using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class extendReservationsa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RoomReservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "DeskReservations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "RoomReservations");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "DeskReservations");
        }
    }
}
