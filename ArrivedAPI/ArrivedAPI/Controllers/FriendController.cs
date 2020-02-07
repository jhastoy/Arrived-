using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Test.Repositories;
using System.Security.Claims;
using Domain.FromBodyClasses;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        IAccountRepository _accountRepo;
        public FriendController()
        {
            _accountRepo = new AccountRepository();
        }
        [Authorize]
        [Route("[action]")]
        [HttpPost]
        public IActionResult AddFriendAccount([FromBody] AccountFromBody accountFromBody)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            Accounts addAccount = _accountRepo.AddFriendByPhoneNumber(a, accountFromBody.PhoneNumber);
            if (addAccount == null)
            {
                return BadRequest(new { message = "Utilisateur Inexistant" });
            }
            else
            {
                Accounts result = new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel);
                return (Ok(result));
            }
        }

        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetFriendAccount()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            if(a.FriendsAccount == null)
            {
                return Ok(null);
            }
            else
            {
                List<Accounts> friends = new List<Accounts>();
                foreach(Accounts account in a.FriendsAccount)
                {
                    friends.Add(new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel));
                }
                return Ok(friends);
            }
        }

        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }

    }
}