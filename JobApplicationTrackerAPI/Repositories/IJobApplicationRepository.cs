using JobApplicationTrackerAPI.Models;

namespace JobApplicationTrackerAPI.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<List<JobApplication>> GetAllAsync();
        Task<JobApplication?> GetByIdAsync(int id);
        Task<JobApplication> AddAsync(JobApplication app);
        Task<JobApplication?> UpdateAsync(JobApplication app);

        Task DeleteAsync(int id);
    }
}