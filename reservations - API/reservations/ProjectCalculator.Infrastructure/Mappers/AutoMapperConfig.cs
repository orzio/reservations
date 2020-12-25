using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Mappers
{
   public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Token, TokenDto>();
                cfg.CreateMap<Desk, DeskDto>();
                cfg.CreateMap<Room, RoomDto>();
                cfg.CreateMap<Office, OfficeDto>();
                cfg.CreateMap<Address, CityDto>();
                cfg.CreateMap<DeskReservation, DeskReservationDto>();
                cfg.CreateMap<RoomReservation, RoomReservationDto>();
            }).CreateMapper();
    }
}
