using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Room
{
    public class DeskReservationHandler : ICommandHandler<CreateDeskReservation>
    {
        private readonly IDeskReservationService _deskReservationService;

        public DeskReservationHandler(IDeskReservationService deskReservationService)
        {
            _deskReservationService = deskReservationService;
        }

        public async Task HandleAsync(CreateDeskReservation command)
        {
            await _deskReservationService.ReserveDesk(Guid.NewGuid(), command.UserId, command.DeskId, command.StartDate, command.EndDate);
        }
    }
}
