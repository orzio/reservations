using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
    public interface IAddressRepository:IRepository
    {
        Task<IEnumerable<Address>> GetAllAsync();
    }
}
