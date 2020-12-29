using Reservations.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Account.Password
{
    public class ChangePasswordService : IChangePasswordService
    {

        private readonly IEncrypter _encrypter;
        private readonly IUserRepository _userRepository;

        public ChangePasswordService(IUserRepository userRepository, IEncrypter encrypter)
        {
            _userRepository = userRepository;
            _encrypter = encrypter;
        }

        public async Task ResetPassword(string currentPassword, string newPassword, Guid userId)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new Exception("Invalid credentials");
            }
            var currentPasswordHash = _encrypter.CreatePasswordHash(currentPassword, user.Salt);
            var isEqual = true;

            for (int i = 0; i < user.Password.Length; i++)
            {
                if (user.Password[i] != currentPasswordHash[i])
                {
                    isEqual = false;
                    throw new Exception("Invalid credentials");

                }
            }

            _encrypter.CreatePasswordHash(newPassword);

            var salt = _encrypter.GetSalt();
            var hash = _encrypter.GetPassworHash();

            user.Salt = salt;
            user.Password = hash;

            await _userRepository.UpdateAsync(user);
        }
    }
}
