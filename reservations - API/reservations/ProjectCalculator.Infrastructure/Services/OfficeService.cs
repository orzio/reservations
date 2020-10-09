using AutoMapper;
using ProjectCalculator.Api.Repositories;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class OfficeService :IOfficeService
    {
        private readonly IOfficeRepository _officeRepository;
        private readonly IMapper _mapper;

        public OfficeService(IOfficeRepository offficeRepository, IMapper mapper)
        {
            _officeRepository = offficeRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(Guid userId, string name,Address address)
        {
            var office = new Office(userId,address,name);
            await _officeRepository.AddAsync(office);
        }


    }
}
