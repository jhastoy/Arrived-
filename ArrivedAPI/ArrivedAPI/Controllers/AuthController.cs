using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ArrivedAPI.Services;
using Domain;
using Test.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAccountService _userService;
        private IAccountRepository _accountRepo;
        public AuthController(IAccountService userService)
        {
            _accountRepo = new AccountRepository();
            _userService = userService;
        }
        // POST: api/Auth
        [Route("[action]")]
        [HttpPost]
        public IActionResult Login([FromBody] Accounts userParams)
        {
            Console.WriteLine(userParams);
            var user = _userService.Authenticate(userParams.EmailAccount, userParams.PasswordAccount);
            if(user == null)
            {
                return BadRequest(new { message = "Email ou mot de passe incorrect" });
            }
            Accounts a = new Accounts(user.IdAccount, user.PhoneNumberAccount, user.EmailAccount, user.NameAccount, user.SurnameAccount, user.InTravel, user.InDanger,user.LastPositionAccount,user.WarningsAccount,user.FriendsAccount, user.TravelAccount, user.FollowedTravelsAccount,user.PlacesAccount,user.Token, user.AlertChoiceAccount);
            return Ok(a);
        }
        [Route("[action]")]
        [HttpPost]
        public IActionResult Register([FromBody] Accounts userParams)
        {
            IAccountRepository repo = new AccountRepository();
            userParams.InitPreferences();
            var user = repo.Add(userParams);
            if(user == null)
                return BadRequest(new { message = "Utilisateur déjà existant" });

            return Ok( _userService.Authenticate(userParams.EmailAccount, userParams.PasswordAccount));
        }
        [Route("[action]")]
        [Authorize]
        [HttpGet]
        public IActionResult Refresh()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts user = _accountRepo.GetById(GetIdByToken(identity));
            Accounts a = new Accounts(user.IdAccount, user.PhoneNumberAccount, user.EmailAccount, user.NameAccount, user.SurnameAccount, user.InTravel, user.InDanger, user.LastPositionAccount, user.WarningsAccount, user.FriendsAccount, user.TravelAccount, user.FollowedTravelsAccount, user.PlacesAccount, user.Token, user.AlertChoiceAccount);
            return Ok(a);
        }
        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }

    }
}
