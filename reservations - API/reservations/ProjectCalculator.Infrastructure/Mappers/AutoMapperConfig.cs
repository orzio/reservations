using AutoMapper;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using Reservations.Core.Domain;
using Reservations.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Reservations.Infrastructure.Mappers
{
   public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Photo, PhotoDto>();
                cfg.CreateMap<Token, TokenDto>();
                cfg.CreateMap<Desk, DeskDto>();
                cfg.CreateMap<Room, RoomDto>()
                .ForMember(dest => dest.MainUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).PhotoUrl));
                cfg.CreateMap<Office, OfficeDto>();
                cfg.CreateMap<Address, CityDto>();
                cfg.CreateMap<DeskReservation, DeskReservationDto>();
                cfg.CreateMap<DeskReservation, DeskOfficeReservationDto>()
                    .ForMember(dest => dest.OfficeName, opt => opt.MapFrom(src => src.Desk.Office.Name))
                    .ForMember(dest => dest.OfficeAddress, opt => opt.MapFrom(src => src.Desk.Office.Address))
                    .ForMember(dest => dest.DeskDto, opt => opt.MapFrom(src => src.Desk));
                cfg.CreateMap<RoomReservation, RoomReservationDto>();
                cfg.CreateMap<RoomReservation, RoomReservationForManagerDto>()
                   .ForMember(dest => dest.OfficeName, opt => opt.MapFrom(src => src.Room.Office.Name))
                   .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
                   .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room.Name));
                cfg.CreateMap<RoomReservation, RoomOfficeReservationDto>()
                    .ForMember(dest => dest.OfficeName, opt => opt.MapFrom(src => src.Room.Office.Name))
                    .ForMember(dest => dest.OfficeAddress, opt => opt.MapFrom(src => src.Room.Office.Address))
                    .ForMember(dest => dest.RoomDto, opt => opt.MapFrom(src => src.Room));
            }).CreateMapper();
    }
}
