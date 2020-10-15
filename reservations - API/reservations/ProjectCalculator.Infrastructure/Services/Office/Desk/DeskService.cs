using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Core.Repositories;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reservations.Infrastructure.Services
{
    public class DeskService : IDeskService
    {
        private readonly IDeskRepository _deskRepository;
        private readonly IMapper _mapper;
        private readonly IOfficeRepository _officeRepository;

        public DeskService(IDeskRepository deskRepository, IMapper mapper, IOfficeRepository officeRepository)
        {
            _deskRepository = deskRepository;
            _officeRepository = officeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DeskDto>> BrowseAsync()
        {
            var desks = await _deskRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<Desk>, IEnumerable<DeskDto>>(desks);
        }

        public async Task CreateDesk(Guid officeId, Guid deskId, string name, int seats)
        {
            var desk = await _deskRepository.GetAsync(name);
            if (desk != null)
            {
                throw new Exception($"Desk: '{name}' already exists.");
            }
            desk = new Desk()
            {
                Name = name,
                OfficeId = officeId,
                Id = deskId,
                Seats = seats
            };
            await _deskRepository.AddAsync(desk);
        }

        public async Task<DeskDto> GetAsync(Guid id)
        {
            var desk = await _deskRepository.GetAsync(id);
            return _mapper.Map<Desk, DeskDto>(desk);
        }

        public async Task RemoveDesk(Guid deskId)
        => await _deskRepository.DeleteAsync(deskId);

    }
}
