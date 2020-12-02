using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Handlers
{
    public class CreateOfficeHandler : ICommandHandler<CreateOffice>
    {
        private readonly IOfficeService _officeService;

        public CreateOfficeHandler(IOfficeService officeService)
        {
            _officeService = officeService;
        }
           
        public async Task HandleAsync(CreateOffice command)
        {
            await _officeService.CreateAsync(Guid.NewGuid(),command.UserId, command.Name, command.Address, command.Description);
        }
    }
}
