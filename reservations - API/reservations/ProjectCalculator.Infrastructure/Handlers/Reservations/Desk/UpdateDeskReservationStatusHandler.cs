using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class UpdateDeskReservationStatusHandler : ICommandHandler<UpdateDeskReservationStatus>
    {

        private readonly IDeskReservationService _deskReservationService;

        public UpdateDeskReservationStatusHandler(IDeskReservationService deskReservationService)
        {
            _deskReservationService = deskReservationService;
        }

        public async Task HandleAsync(UpdateDeskReservationStatus command)
        {
            await _deskReservationService.UpdateReservationStatus(command.Id, command.Status);
        }
    }
}
