using Reservations.Infrastructure;
using Reservations.Infrastructure.DTO;
using System;

using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IAddressService:IService
    {
        Task<IEnumerable<CityDto>> GetCities();
    }
}
