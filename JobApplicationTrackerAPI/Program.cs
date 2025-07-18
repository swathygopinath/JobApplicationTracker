using JobApplicationTrackerAPI.Data;
using JobApplicationTrackerAPI.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseSqlite("Data Source=JobApps.db"));

builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();



app.UseCors("AllowReactDev");

app.UseAuthorization();
app.MapControllers();

app.Run();





