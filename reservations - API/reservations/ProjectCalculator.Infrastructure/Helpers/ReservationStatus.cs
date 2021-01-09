using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Helpers
{
    public enum ReservationStatus
    {
        Rejected = 0,
        Accepted = 1,
        WatingForApproval = 2
    }
}
