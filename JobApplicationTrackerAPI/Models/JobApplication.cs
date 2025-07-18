using System.ComponentModel.DataAnnotations;

namespace JobApplicationTrackerAPI.Models
{
    public enum ApplicationStatus
    {
        Applied,
        Interview,
        Offer,
        Rejected
    }

    public class JobApplication
    {
        public int Id { get; set; }

        [Required]
        public string? Company { get; set; }

        [Required]
        public string? Position { get; set; }

        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        public DateTime DateApplied { get; set; } = DateTime.UtcNow;

    }
}