using MatrixScrabble.Server.Services;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MatrixScrabble.Server.Models.context;

namespace MatrixScrabble.Server
{
	public class Startup
	{
		const string ReactAppOrigins = "ReactAppOrigins";

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
		}

		public IConfiguration Configuration { get; }

		// This method gets called by runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			//services.Configure<MongoDbSettings>(mongoDbSettings);

			// Add services to the container.
			//services.AddSingleton<IDbContext, DbContext>();

			services.AddDbContext<ScrabbleContext>(options =>
			{
				var sqlConnection = new SqlConnection(Configuration.GetSection("SqlSettings:ConnectionString").Value);
				options.UseSqlServer(sqlConnection).EnableSensitiveDataLogging(false);

			}, ServiceLifetime.Transient);

			services.AddScoped(typeof(ISqlRepository<>), typeof(SqlRepository<>));
			services.AddScoped<IGameService, GameService>();

			services.AddScoped<IGameMapper, GameMapper>();

			services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			services.AddEndpointsApiExplorer();
			services.AddSwaggerGen();

			services.AddCors(options =>
			{
				options.AddPolicy(ReactAppOrigins,
					policy =>
					{
						policy.WithOrigins("https://localhost:5173")
							.AllowAnyHeader()
							.AllowAnyMethod();
					});
			});
		}

		// This method gets called by runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			//app.UseDefaultFiles();
			//app.UseStaticFiles();

			// Configure the HTTP request pipeline.
			if (env.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseRouting();

			app.UseAuthorization();

			app.UseCors(ReactAppOrigins);

			app.UseEndpoints(endpoint =>
			{
				endpoint.MapControllers();
				//endpoint.MapFallbackToFile("/index.html");
			});
		}
	}
}
