using EventTrackerApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Rejestracja usług
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Event Tracker API", Version = "v1" });
});

builder.Services.AddDbContext<EventContext>(options =>
    options.UseSqlite("Data Source=events.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


app.UseHttpsRedirection();
app.UseStaticFiles();            // <-- Umożliwia serwowanie index.html i innych z wwwroot
app.UseCors("AllowAll");
app.UseAuthorization();

// Swagger UI 
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Event Tracker API V1");
    c.RoutePrefix = "swagger";
});

// API endpointy
app.MapControllers();

app.Run();
