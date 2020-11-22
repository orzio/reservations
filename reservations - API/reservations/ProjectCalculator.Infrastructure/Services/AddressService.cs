using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Reservations.Core.Domain;
using System.Diagnostics.CodeAnalysis;
using AutoMapper;

namespace Reservations.Infrastructure.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;
        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<IEnumerable<CityDto>> GetCities()
        {
            var cities = (await _addressRepository.GetAllAsync())
                .GroupBy(x => x.City).Select(x => new CityDto{ Name = x.Key });


            return cities;
        }
    }

  
}
