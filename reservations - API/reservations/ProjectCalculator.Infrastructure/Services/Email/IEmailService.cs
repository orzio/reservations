using Reservations.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Email
{
   public interface IEmailService:IService
    {
        Task SendEmail(string to, string text);
    }
}
