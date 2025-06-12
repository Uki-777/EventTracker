using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventTrackerApi.Data;
using EventTrackerApi.Models;

namespace EventTrackerApi.Controllers
{
    [ApiController]
    [Route("files")]
    public class FilesController : ControllerBase
    {
        private readonly EventContext _context;

        public FilesController(EventContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFiles()
        {
            var files = await _context.Files.ToListAsync();
            return Ok(files);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var file = await _context.Files.FindAsync(id);
            if (file == null)
                return NotFound(new { message = "Plik nie istnieje" });

            _context.Files.Remove(file);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
