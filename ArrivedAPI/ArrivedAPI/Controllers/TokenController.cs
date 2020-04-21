using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;
using DAL.Repositories;
using System.Security.Claims;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private IAccountRepository _accountRepo;
        public TokenController()
        {
            _accountRepo = new AccountRepository();
        }
        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult IsTokenValid()
        {
            return Ok("valid");
        }
        [Authorize]
        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateExpoToken([FromBody] Accounts expoToken)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            _accountRepo.SaveOrUpdateExpoToken(a, expoToken.ExpoToken);
            return Ok();
        }

        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }
    }
}