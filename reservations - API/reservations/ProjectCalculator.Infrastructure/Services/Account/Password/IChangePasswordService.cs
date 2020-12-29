using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Account.Password
{
    public interface IChangePasswordService:IService
    {
        Task ResetPassword(string currentPassword, string newPassword, Guid userId);
    }
}
