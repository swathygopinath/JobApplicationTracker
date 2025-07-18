using Microsoft.AspNetCore.Mvc;
using JobApplicationTrackerAPI.Models;
using JobApplicationTrackerAPI.Repositories;

namespace JobApplicationTrackerAPI.Controllers
{
    [ApiController]
    [Route("applications")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationRepository _repo;

        public JobApplicationsController(IJobApplicationRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var app = await _repo.GetByIdAsync(id);
            return app == null ? NotFound() : Ok(app);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JobApplication app)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _repo.AddAsync(app);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] JobApplication app)
        {
            if (id != app.Id) return BadRequest("ID mismatch");
            var updated = await _repo.UpdateAsync(app);
            return updated == null ? NotFound() : NoContent();
        }

        // <-- Add this Delete method:

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingApp = await _repo.GetByIdAsync(id);
            if (existingApp == null)
            {
                return NotFound();
            }

            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
