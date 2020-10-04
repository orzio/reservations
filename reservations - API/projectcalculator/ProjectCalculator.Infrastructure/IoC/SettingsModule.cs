using Autofac;
using Microsoft.Extensions.Configuration;
using ProjectCalculator.Infrastructure.EF;
using ProjectCalculator.Infrastructure.Extensions;
using ProjectCalculator.Infrastructure.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCalculator.Infrastructure.IoC
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
