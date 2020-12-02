using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.DTO
{
    public class TokenDto
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
