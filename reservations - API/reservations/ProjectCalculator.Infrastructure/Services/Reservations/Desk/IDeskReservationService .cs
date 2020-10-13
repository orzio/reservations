using ProjectCalculator.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IDeskReservationService :IService
    {
        Task ReserveDesk(Guid reservationId, Guid userId, Guid deskId, DateTime startTime, DateTime endTime);
    }
}
