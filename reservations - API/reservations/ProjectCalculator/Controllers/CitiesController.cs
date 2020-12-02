using Microsoft.AspNetCore.Mvc;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.DTO;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CitiesController:ControllerBase
    {
        private readonly IAddressService _addressService;
        private readonly ICommandDispatcher _commandDispatcher;
        public CitiesController(IAddressService addressService, ICommandDispatcher commandDispatcher)
        {
            _addressService = addressService;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet]
        public async Task<IEnumerable<CityDto>> Get()
        => await _addressService.GetCities();

    }
}
