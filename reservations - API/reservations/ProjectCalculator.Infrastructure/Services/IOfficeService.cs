using ProjectCalculator.Infrastructure;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public interface IOfficeService:IService
    {
        Task CreateAsync(Guid userId, string name, Address address);
    }
}
