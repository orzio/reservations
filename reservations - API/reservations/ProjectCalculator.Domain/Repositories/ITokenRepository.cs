﻿using Reservations.Api.Repositories;
using Reservations.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Core.Repositories
{
   public interface ITokenRepository:IRepository
    {
        Task<Token> GetAsync(Guid id);
        Task AddAsync(Token token);
        Task UpdateAsync(Token token);
        Task RemoveAsync(Guid id);
    }
}
