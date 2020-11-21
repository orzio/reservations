using ProjectCalculator.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Account.Password
{
    public interface IForgotPasswordService:IService
    {
        Task SendResetToken(string email);
        Task ResetPassword(string token, string newPassword);
    }
}
