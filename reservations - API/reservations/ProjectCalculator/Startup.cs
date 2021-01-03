using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Reservations.Infrastructure.IoC;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.IdentityModel.Tokens;
using Reservations.Infrastructure.Data;
using Reservations.Infrastructure.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Reservations.Infrastructure.Extensions;
using Reservations.Infrastructure.SignalR;
using System.Threading;
using Reservations.Infrastructure.Helpers;

namespace Reservations
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public ILifetimeScope AutofacContainer { get; private set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

          services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .SetIsOriginAllowed((host) => true)
                       .AllowCredentials();
            }));

            var jwtKey = Configuration.GetSettings<JwtSettings>().Key;
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //   .AddJwtBearer(options =>
            //   {
            //       options.TokenValidationParameters = new TokenValidationParameters
            //       {
            //           ValidateIssuerSigningKey = true,
            //           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSettings<JwtSettings>().Key)),
            //           ValidateIssuer = false,
            //           ValidateAudience = false
            //       };
            //   });
            //services.AddCors();
            services.AddAuthorization(x => x.AddPolicy("admin", p => p.RequireRole("admin")));
            services.AddAuthorization(x => x.AddPolicy("user", p => p.RequireRole("user")));
            services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(Configuration["sql:connectionString"]));
            //options.UseSqlite(Configuration
            //.GetConnectionString("DefaultConnection")));
            services.AddControllers()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            
            services.AddSignalR();
            services.AddControllers();
            services.AddMemoryCache();
            services.AddSingleton<RoomSemaphore>();
            services.AddSingleton<DeskSemaphore>();
            services.AddDirectoryBrowser();

        }
        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Register your own things directly with Autofac, like:
            builder.RegisterModule(new ContainerModule(Configuration));
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

                
            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ReservationHub>("/reservations");
            });


        }
    }
}
