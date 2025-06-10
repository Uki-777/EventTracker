namespace EventTrackerApi.Models
{
    public class EventDto
    {
        public string Nazwa { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Kategoria { get; set; } = string.Empty;
        public string Lokalizacja { get; set; } = string.Empty;
        public string Opis { get; set; } = string.Empty;
    }
}
