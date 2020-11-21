using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly string _coworkEmail = "cowork.reservation@gmail.com";
        private readonly string _emailSubject = "Reset password";

        public async Task SendEmail(string to, string text)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_coworkEmail));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = _emailSubject;
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = string.Format(@$"{text}");

            email.Body = bodyBuilder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_coworkEmail, "Oko(*)123");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
