﻿using ProjectCalculator.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reservations.Core.Domain
{
    public class Office
    {
        public Guid Id { get; protected set; }
        public Guid UserId { get; protected set; }
        public Address Address { get; protected set; }
        public string Name { get; protected set; }
        public string Description { get; set; }
        public List<Room> Rooms { get; protected set; }
        public List<Desk> Desks { get; protected set; }

        protected Office() { }

        public Office(Guid officeId,Guid userId, Address address, string name, string description)
        {
            Id = officeId;
            UserId = userId;
            Address = address;
            Name = name;
            Description = description;
        }
    }
}
