using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Services
{
    public interface IJwtService
    {
        JwtDto CreateToken(Guid userId,string name, string role);
    }
}
