using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.OfficeCommands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers
{
    public class UpdateOfficeHandler : ICommandHandler<UpdateOffice>
    {
        private readonly IOfficeService _officeService;
        public UpdateOfficeHandler(IOfficeService officeService)
        {
            _officeService = officeService;
        }
        public async Task HandleAsync(UpdateOffice command)
        {
            await _officeService.UpdateOffice(command.OfficeId, command.UserId, command.Address, command.Name, command.Description);
        }
    }
}
