using MatrixScrabble.Server.Services;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MatrixScrabble.Server.Models.Сontext;
using MatrixScrabble.Server.Helpers;
using System.Text.Json.Serialization;
using MatrixScrabble.Server.Factories;

namespace MatrixScrabble.Server;
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

		services.AddDbContext<ScrabbleContext>(options =>
		{
			var sqlConnection = new SqlConnection(Configuration.GetSection("SqlSettings:ConnectionString").Value);
			options.UseSqlServer(sqlConnection).EnableSensitiveDataLogging(false);

		}, ServiceLifetime.Transient);

		services.AddScoped(typeof(ISqlRepository<>), typeof(SqlRepository<>));

		#region Services
		services.AddScoped<IGameService, GameService>();
		#endregion

		#region Mappers
		services.AddScoped<IGameMapper, GameMapper>();
		#endregion

		#region Helpers
		services.AddSingleton<IDictionaryHelper, DictionaryHelper>();
		services.AddScoped<IJsonSerializerHelper, JsonSerializerHelper>();
		#endregion

		#region Factories
		services.AddScoped<IGameBoardFactory, GameBoardFactory>();
		#endregion


		services.AddControllers().AddJsonOptions(options =>
		{
			options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
		});
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		services.AddEndpointsApiExplorer();
		services.AddSwaggerGen();

		services.AddCors(options =>
		{
			options.AddPolicy(ReactAppOrigins,
				policy =>
				{
					policy
					 .AllowAnyOrigin()
					 .AllowAnyMethod()
					 .AllowAnyHeader();
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
