using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Reservations.Infrastructure.IoC
{
    public class MySemaphore : SemaphoreSlim
    {
        public MySemaphore(int initialCount=1) : base(initialCount)
        {
        }
    }
}
