using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Reservations.Infrastructure.Helpers
{
    public class DeskSemaphore : SemaphoreSlim
    {
        public DeskSemaphore(int initialCount = 1) : base(initialCount)
        {
        }
    }
}