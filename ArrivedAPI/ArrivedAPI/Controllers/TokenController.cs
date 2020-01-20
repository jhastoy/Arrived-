using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public IActionResult IsTokenValid([FromBody] Accounts token)
        {
            return Ok("valid");
        }
    }
}