using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class OtherEquipment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtherEquipment",
                table: "Rooms",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtherEquipment",
                table: "Rooms");
        }
    }
}
