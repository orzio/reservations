using AutoMapper;
using ProjectCalculator.Api.Repositories;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
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

        public async Task CreateAsync(Guid officeId, Guid userId, string name,Address address)
        {
            var office = new Office(officeId, userId,address,name);
            await _officeRepository.AddAsync(office);
        }

        public async Task DeleteOffice(Guid officeId)
        {
            await _officeRepository.DeleteAsync(officeId);
        }

        public async Task UpdateOffice(Guid officeId,Guid userId, Address address, string name)
        {
            var office = new Office(officeId, userId, address, name);
            await _officeRepository.UpdateAsync(office);
        }

        public async Task<IEnumerable<OfficeDto>> BrowseAsync()
        {
            var offices = await _officeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<Office>, IEnumerable<OfficeDto>>(offices);
        }


    }
}
