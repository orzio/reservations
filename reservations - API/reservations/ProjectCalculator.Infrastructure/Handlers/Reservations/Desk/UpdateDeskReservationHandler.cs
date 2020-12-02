using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class UpdateDeskReservationHandler : ICommandHandler<UpdateDeskReservation>
    {
        private readonly IDeskReservationService _deskReservationService;

        public UpdateDeskReservationHandler(IDeskReservationService deskReservationService)
        {
            _deskReservationService = deskReservationService;
        }

        public async Task HandleAsync(UpdateDeskReservation command)
        {
            await _deskReservationService.UpdateReservation(command.Id, command.StartDate, command.EndDate);
        }
    }
}
