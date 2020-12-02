using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reservations.Core.Domain;
using Reservations.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Reservations.Infrastructure.EF
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(
                serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                if (context.Users.Any())
                    return;

                byte[] passwordhash, passwordSalt;
                CreatePasswordHash("password", out passwordhash, out passwordSalt);

                context.Users.AddRange(
                    new User(
                         Guid.NewGuid(),
                        "orzio488@gmail.com",
                        "Kamil",
                         "Nowak",
                        "user",
                         passwordhash,
                          passwordSalt
                ));
                context.SaveChanges();
            }

        }

            public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
            {
                using (var hmac = new System.Security.Cryptography.HMACSHA512())
                {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                }
            }
    }
}
