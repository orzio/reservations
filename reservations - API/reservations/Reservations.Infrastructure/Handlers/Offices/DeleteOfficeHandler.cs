using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.OfficeCommands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers
{
    public class DeleteOfficeHandler : ICommandHandler<DeleteOffice>
    {
        private readonly IOfficeService _officeService;
        public DeleteOfficeHandler(IOfficeService officeService)
        {
            _officeService = officeService;
        }
        public async Task HandleAsync(DeleteOffice command)
        {
            await _officeService.DeleteOffice(command.Id);
        }
    }
}
