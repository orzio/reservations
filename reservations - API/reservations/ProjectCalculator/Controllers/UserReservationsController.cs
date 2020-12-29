using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Commands.ReservationCommands.Desk;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserReservationsController
    {
     
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IDeskReservationService _deskReservationService;
        public UserReservationsController(ICommandDispatcher commandDispatcher, IDeskReservationService deskReservationService)
        {
            _commandDispatcher = commandDispatcher;
            _deskReservationService = deskReservationService;
        }
        
    }
}
