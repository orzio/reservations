﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCalculator.Infrastructure.EF
{
   public class SqlSettings
    {
        public string ConnectionString { get; set; }
        public bool InMemory { get; set; }
    }
}
