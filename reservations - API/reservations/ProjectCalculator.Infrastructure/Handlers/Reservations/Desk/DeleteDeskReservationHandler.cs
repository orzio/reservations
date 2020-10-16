using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class DeleteDeskReservationHandler : ICommandHandler<DeleteDeskReservation>
    {
        private readonly IDeskReservationService _deskReservationService;

        public DeleteDeskReservationHandler(IDeskReservationService deskReservationService)
        {
            _deskReservationService = deskReservationService;
        }

        public async Task HandleAsync(DeleteDeskReservation command)
        {
            await _deskReservationService.RemoveReservation(command.Id);
        }
    }
}
