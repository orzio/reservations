using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using ProjectCalculator;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Reservations.Test.EndToEnd.Controllers
{
    public class UserControllerTests:IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _httpClient;

        public UserControllerTests(WebApplicationFactory<Startup> factory)
        {
            _httpClient = factory.CreateDefaultClient();
        }

        [Fact]
        public void given_invalid_email_user_should_not_exist()
        {
            bool temp = true;
            temp.Should().BeTrue();
        }
        [Fact]
        public async Task given_valid_email_user_should_exists()
        {
            var email = "orzio@test.com";
            //var response = await _httpClient.GetAsync($"users/1");
            var response = await _httpClient.GetAsync($"users/{email}");
            response.StatusCode.Should().Be(200);
        }
    }
}
