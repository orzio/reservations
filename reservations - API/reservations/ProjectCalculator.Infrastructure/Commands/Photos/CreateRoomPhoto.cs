using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Infrastructure.Commands.Photos
{
    public class CreateRoomPhoto:ICommand
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public IFormFile File { get; set; }
        public Guid OfficeId { get; set; }
        public bool isMain { get; set; }
    }
}
