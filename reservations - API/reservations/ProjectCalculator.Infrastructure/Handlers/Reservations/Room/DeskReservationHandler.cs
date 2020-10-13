using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Room
{
    public class DeskReservationHandler : ICommandHandler<CreateDeskReservation>
    {

        public Task HandleAsync(CreateDeskReservation command)
        {
            
        }
    }
}
