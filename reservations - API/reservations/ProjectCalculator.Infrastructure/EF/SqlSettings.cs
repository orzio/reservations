using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.EF
{
   public class SqlSettings
    {
        public string ConnectionString { get; set; }
        public bool InMemory { get; set; }
    }
}
