using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers
{
    public class CreateDeskHandler : ICommandHandler<CreateDesk>
    {
        private readonly IDeskService _deskService;

        public CreateDeskHandler(IDeskService deskService)
        {
            _deskService = deskService;
        }

        public async Task HandleAsync(CreateDesk command)
        {
            await _deskService.CreateDesk(command.OfficeId, Guid.NewGuid(), command.Name, command.Seats);
        }
    }
}
