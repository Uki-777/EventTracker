using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventTrackerApi.Data;
using EventTrackerApi.Models;

namespace EventTrackerApi.Controllers
{
    [ApiController]
    [Route("events")]
    public class EventsController : ControllerBase
    {
        private readonly EventContext _context;

        public EventsController(EventContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody] EventDto newEvent)
        {
            var entity = new EventEntity
            {
                Nazwa = newEvent.Nazwa,
                Data = newEvent.Data,
                Kategoria = newEvent.Kategoria,
                Lokalizacja = newEvent.Lokalizacja,
                Opis = newEvent.Opis
            };

            _context.Events.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Zapisano do bazy", entity.Id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }
    }
}
