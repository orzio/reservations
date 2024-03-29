﻿using Microsoft.AspNetCore.Mvc;
using ProjectCalculator.Infrastructure.Commands;
using Reservations.Infrastructure.Commands;
using Reservations.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservations.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoomsController:ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IRoomService _roomService;

        public RoomsController(ICommandDispatcher commandDispatcher, IRoomService roomService)
        {
            _commandDispatcher = commandDispatcher;
            _roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult>Post([FromBody] CreateRoom command)
        {
            await _commandDispatcher.DispatchAsync(command);
            return Created($"rooms/{command}", null);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var rooms = await _roomService.BrowseAsync();
            return Ok(rooms);
        }

    }
}
