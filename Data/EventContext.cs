using Microsoft.EntityFrameworkCore;
using EventTrackerApi.Models;

namespace EventTrackerApi.Data
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options)
            : base(options) { }

        public DbSet<EventEntity> Events { get; set; }
    }
}
