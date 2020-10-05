using AutoMapper;
using ProjectCalculator.Api.Repositories;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Services
{
    public class OfficeService :IOfficeService
    {
        private readonly IOffficeRepository _officeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public OfficeService(IOffficeRepository offficeRepository, IUserRepository userRepository, IMapper mapper)
        {
            _officeRepository = offficeRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }


    }
}
