using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Repositories;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertController : ControllerBase
    {
        IAccountRepository _accountRepo;
        public AlertController()
        {
            _accountRepo = new AccountRepository();
        }
        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult UserAlert()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            a.UserAlert();
            _accountRepo.Update(a);
            return Ok();
           
        }
        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult UpdateUserPositionAlert([FromBody] Positions position)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            Positions p = new Positions(position.LatitudePosition, position.LongitudePosition, position.DateTimePosition);
            a.LastPositionAccount = p;
            _accountRepo.Update(a);
            return Ok();
        }
        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult StopAlert()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));

            a.StopAlert();
            _accountRepo.Update(a);
            return Ok();
        }
        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }

    }
}