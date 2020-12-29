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
                cfg.CreateMap<DeskReservation, DeskOfficeReservationDto>()
                    .ForMember(dest => dest.OfficeName, opt => opt.MapFrom(src => src.Desk.Office.Name))
                    .ForMember(dest => dest.OfficeAddress, opt => opt.MapFrom(src => src.Desk.Office.Address))
                    .ForMember(dest => dest.DeskDto, opt => opt.MapFrom(src => src.Desk));
                cfg.CreateMap<RoomReservation, RoomReservationDto>();
                cfg.CreateMap<RoomReservation, RoomOfficeReservationDto>()
                    .ForMember(dest => dest.OfficeName, opt => opt.MapFrom(src => src.Room.Office.Name))
                    .ForMember(dest => dest.OfficeAddress, opt => opt.MapFrom(src => src.Room.Office.Address))
                    .ForMember(dest => dest.RoomDto, opt => opt.MapFrom(src => src.Room));
            }).CreateMapper();
    }
}
