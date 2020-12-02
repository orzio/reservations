using Autofac;
using Microsoft.Extensions.Configuration;
using Reservations.Infrastructure.EF;
using Reservations.Infrastructure.Extensions;
using Reservations.Infrastructure.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.IoC
{
    public class SettingsModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public SettingsModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(_configuration.GetSettings<JwtSettings>())
                .SingleInstance();
            builder.RegisterInstance(_configuration.GetSettings<SqlSettings>())
                .SingleInstance();
        }
    }
}
