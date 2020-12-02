using AutoMapper;
using Reservations.Api.Repositories;
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

        public async Task CreateAsync(Guid officeId, Guid userId, string name,Address address,string description)
        {
            var office = new Office(officeId, userId,address,name,description);
            await _officeRepository.AddAsync(office);
        }

        public async Task DeleteOffice(Guid officeId)
        {
            await _officeRepository.DeleteAsync(officeId);
        }

        public async Task UpdateOffice(Guid officeId,Guid userId, Address address, string name, string description)
        {
            var office = new Office(officeId, userId, address, name, description);
            await _officeRepository.UpdateAsync(office);
        }

        public async Task<IEnumerable<OfficeDto>> BrowseAsync()
        {
            var offices = await _officeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<Office>, IEnumerable<OfficeDto>>(offices);
        }

        public async Task<OfficeDto> GetOffice(Guid officeId)
        {
        var office =  await _officeRepository.GetAsync(officeId);
            return _mapper.Map<Office, OfficeDto>(office);
        }

        public async Task<IEnumerable<OfficeDto>>GetOfficesByUserId(Guid userId){
            var offices = await _officeRepository.GetUsersOfficeAsync(userId);
            return _mapper.Map<IEnumerable<Office>, IEnumerable<OfficeDto>>(offices);
        }

        public async Task<IEnumerable<OfficeDto>>GetOfficesWithDeskByCity(string city)
        {
            var offices = await _officeRepository.GetOfficesWithDesksInCity(city);
            return _mapper.Map<IEnumerable<Office>, IEnumerable<OfficeDto>>(offices);
        }


        public async Task<IEnumerable<OfficeDto>> GetOfficesWithRoomsByCity(string city)
        {
            var offices = await _officeRepository.GetOfficesWithRoomsInCity(city);
            return _mapper.Map<IEnumerable<Office>, IEnumerable<OfficeDto>>(offices);
        }

    }
}
