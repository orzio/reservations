using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers.Desk
{
    public class DeleteDeskCommandHandler : ICommandHandler<RemoveDesk>
    {
        private readonly IDeskService _deskService;

        public DeleteDeskCommandHandler(IDeskService deskService)
        {
            _deskService = deskService;
        }

        public async Task HandleAsync(RemoveDesk command)
        {
            await _deskService.RemoveDesk(command.Id);
        }
    }
}
