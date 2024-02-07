using MatrixScrabble.Server.DataLayer;
using MatrixScrabble.Server.Services;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Repositories;

namespace MatrixScrabble.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public IConfiguration Configuration { get; }

        // This method gets called by runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var mongoDbSettings = Configuration.GetSection("MongoDbSettings");
            services.Configure<MongoDbSettings>(mongoDbSettings);

            // Add services to the container.
            services.AddSingleton<IDbContext, DbContext>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IGameService, GameService>();
            services.AddSingleton<IDictionaryService, DictionaryService>();
            services.AddScoped<IGameMapper, GameMapper>();

            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
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

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapControllers();
                //endpoint.MapFallbackToFile("/index.html");
            });
        }
    }
}
