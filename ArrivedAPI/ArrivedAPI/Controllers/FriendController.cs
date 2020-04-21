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
        public IActionResult AddFriendAccount([FromBody] Accounts accountFromBody)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            Accounts addAccount = _accountRepo.GetAccountByPhoneNumber(accountFromBody.PhoneNumberAccount);

            if (addAccount == null)
            {
                return BadRequest(new { message = "Utilisateur Inexistant" });
            }
            else
            {
                a.FriendsAccount.Add(addAccount);
                addAccount.FriendsAccount.Add(a);
                _accountRepo.Update(a);
                _accountRepo.Update(addAccount);
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
            if (a.FriendsAccount == null)
            {
                return Ok(null);
            }
            else
            {
                List<Accounts> friends = new List<Accounts>();
                foreach (Accounts account in a.FriendsAccount)
                {
                    friends.Add(new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel));
                }
                return Ok(friends);
            }
        }
        [Authorize]
        [Route("[action]")]
        [HttpPost]
        public IActionResult GetAccountByPhoneNumber([FromBody] Accounts userToSearch)
        {
            Accounts a = _accountRepo.GetAccountByPhoneNumber(userToSearch.PhoneNumberAccount);
            if (a != null)
            {
                Accounts returnAccount = new Accounts(a.IdAccount,a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel);
                return Ok(returnAccount);
            }
            Accounts returnNull = new Accounts();
            return Ok(returnNull);




        }
        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult DeleteFriendAccount([FromBody] Accounts friend)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            Accounts friendToRemove = a.FriendsAccount.Where(x => x.IdAccount == friend.IdAccount).FirstOrDefault();
            a.FriendsAccount.Remove(friendToRemove);
            _accountRepo.Update(a);

            friendToRemove.FriendsAccount.Remove(a);
            _accountRepo.Update(friendToRemove);
            return Ok();
        }

        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }

    }
}