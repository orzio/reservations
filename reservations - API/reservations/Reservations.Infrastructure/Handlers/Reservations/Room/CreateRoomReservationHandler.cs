﻿using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Room;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Reservations.Desk
{
    public class CreateRoomReservationHandler : ICommandHandler<CreateRoomReservation>
    {
        private readonly IRoomReservationService _roomReservationService;

        public CreateRoomReservationHandler(IRoomReservationService roomReservationService)
        {
            _roomReservationService = roomReservationService;
        }

        public async Task HandleAsync(CreateRoomReservation command)
        {
            await _roomReservationService.ReserveRoom(Guid.NewGuid(), command.UserId, command.RoomId, command.StartDate, command.EndDate);
        }
    }
}
