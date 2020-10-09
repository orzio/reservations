using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class jtab7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserDesk",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    DeskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDesk", x => new { x.UserId, x.DeskId });
                    table.ForeignKey(
                        name: "FK_UserDesk_Desks_DeskId",
                        column: x => x.DeskId,
                        principalTable: "Desks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDesk_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoom",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoomId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoom", x => new { x.UserId, x.RoomId });
                    table.ForeignKey(
                        name: "FK_UserRoom_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoom_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserDesk_DeskId",
                table: "UserDesk",
                column: "DeskId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoom_RoomId",
                table: "UserRoom",
                column: "RoomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserDesk");

            migrationBuilder.DropTable(
                name: "UserRoom");
        }
    }
}
