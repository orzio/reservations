using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Room
{
    public class UpdateRoomReservationHandler : ICommandHandler<UpdateRoomReservation>
    {
        private readonly IRoomReservationService _roomReservationService;

        public UpdateRoomReservationHandler(IRoomReservationService roomReservationService)
        {
            _roomReservationService = roomReservationService;
        }

        public async Task HandleAsync(UpdateRoomReservation command)
        {
            await _roomReservationService.UpdateReservation(command.Id, command.StartDate, command.EndDate);
        }
    }
}
