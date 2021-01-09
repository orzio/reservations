using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reservations.Infrastructure.Migrations
{
    public partial class initaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offices_Addresses_AddressId",
                table: "Offices");

            migrationBuilder.DropIndex(
                name: "IX_Offices_AddressId",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Offices");

            migrationBuilder.AddColumn<Guid>(
                name: "OfficeId",
                table: "Addresses",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.DropColumn(
                name: "OfficeId",
                table: "Addresses");

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "Offices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Offices_AddressId",
                table: "Offices",
                column: "AddressId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_Addresses_AddressId",
                table: "Offices",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
