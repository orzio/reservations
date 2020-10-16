using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Room
{
    public class DeleteRoomReservationHandler : ICommandHandler<DeleteRoomReservation>
    {
        private readonly IRoomReservationService _roomReservationService;

        public DeleteRoomReservationHandler(IRoomReservationService roomReservationService)
        {
            _roomReservationService = roomReservationService;
        }

        public async Task HandleAsync(DeleteRoomReservation command)
        {
            //await _roomReservationService.
        }


    }
}
