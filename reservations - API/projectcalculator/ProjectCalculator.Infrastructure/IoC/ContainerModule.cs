﻿using Autofac;
using Autofac.Core;
using Autofac.Core.Registration;
using Microsoft.Extensions.Configuration;
using ProjectCalculator.Infrastructure.Mappers;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCalculator.Infrastructure.IoC
{
    public class ContainerModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;
        public ContainerModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfig.Initialize())
    .SingleInstance();
            builder.RegisterModule<CommandModule>();
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterModule<ServiceModule>();
            builder.RegisterModule(new SettingsModule(_configuration));
        }
    }
}
