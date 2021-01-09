using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class initaaakl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offices_Addresses_Id",
                table: "Offices");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_OfficeId",
                table: "Addresses",
                column: "OfficeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Offices_OfficeId",
                table: "Addresses",
                column: "OfficeId",
                principalTable: "Offices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Offices_OfficeId",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_OfficeId",
                table: "Addresses");

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_Addresses_Id",
                table: "Offices",
                column: "Id",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
