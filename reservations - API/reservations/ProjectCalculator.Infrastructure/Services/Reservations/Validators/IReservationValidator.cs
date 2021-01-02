using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Services.Reservations.Validators
{
    public interface IReservationValidator
    {
        bool Verify();
    }
}
