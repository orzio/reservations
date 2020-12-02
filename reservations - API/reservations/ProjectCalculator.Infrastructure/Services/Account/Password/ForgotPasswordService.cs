using Reservations.Api.Repositories;
using Reservations.Infrastructure.Services;
using Reservations.Infrastructure.Services.Email;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Account.Password
{
    public class ForgotPasswordService : IForgotPasswordService
    {
        private readonly IEncrypter _encrypter;
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;

        public ForgotPasswordService(IEmailService emailService, IUserRepository userRepository, IEncrypter encrypter)
        {
            _emailService = emailService;
            _userRepository = userRepository;
            _encrypter = encrypter;
        }

        public async Task SendResetToken(string email)
        {
            var user = await _userRepository.GetAsync(email);
            if (user == null)
                return;
            Byte[] bytes;
            string bytesBase64Token;
            using (var random = RandomNumberGenerator.Create())
            {
                bytes = new Byte[12];
                random.GetBytes(bytes);
                string base64 = Convert.ToBase64String(bytes);
                bytesBase64Token = base64.Replace('+', '-').Replace('/', '_');
            }

            user.ResetPasswordToken = bytesBase64Token;
            user.ResetPasswordTokenCreated = DateTime.UtcNow;

            var url = $"http://localhost:4200/forgotpassword/resetpassword?token={bytesBase64Token}";
            await _emailService.SendEmail(email, url);
            await _userRepository.UpdateAsync(user);
        }

        public async Task ResetPassword(string token, string newPassword)
        {
            var tokenExpiry = 5;
            var user = await _userRepository.GetUserByTokenAsync(token);
            if (user == null)
                throw new Exception("Invalid Data");

            if (user.ResetPasswordToken != token)
                throw new Exception("Invalid Data");

            var startedDate = user.ResetPasswordTokenCreated;
            var expiryDate = startedDate.AddMinutes(tokenExpiry);

            if (DateTime.UtcNow > expiryDate)
                throw new Exception("Token has expired");

            _encrypter.CreatePasswordHash(newPassword);

            var salt = _encrypter.GetSalt();
            var hash = _encrypter.GetPassworHash();

            user.Salt = salt;
            user.Password = hash;

            await _userRepository.UpdateAsync(user);
        }
    }
}
