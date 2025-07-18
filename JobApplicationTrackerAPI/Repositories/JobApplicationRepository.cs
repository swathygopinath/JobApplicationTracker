using JobApplicationTrackerAPI.Data;
using JobApplicationTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTrackerAPI.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly ApplicationDbContext _context;
        public JobApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobApplication>> GetAllAsync()
        {
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication?> GetByIdAsync(int id)
        {
            return await _context.JobApplications.FindAsync(id);
        }

        public async Task<JobApplication> AddAsync(JobApplication app)
        {
            _context.JobApplications.Add(app);
            await _context.SaveChangesAsync();
            return app;
        }

        public async Task<JobApplication?> UpdateAsync(JobApplication app)
        {
            var existing = await _context.JobApplications.FindAsync(app.Id);
            if (existing == null) return null;

            existing.Status = app.Status;
            existing.Position = app.Position;
            existing.Company = app.Company;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task DeleteAsync(int id)
        {
            var app = await _context.JobApplications.FindAsync(id);
            if (app != null)
            {
                _context.JobApplications.Remove(app);
                await _context.SaveChangesAsync();
            }
        }
    }
}
