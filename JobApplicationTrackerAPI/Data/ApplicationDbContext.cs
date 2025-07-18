using Microsoft.EntityFrameworkCore;
using JobApplicationTrackerAPI.Models;

namespace JobApplicationTrackerAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<JobApplication> JobApplications { get; set; }
    }
}
