using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobApplicationTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddNotesField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "JobApplications",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "JobApplications");
        }
    }
}
