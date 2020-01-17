using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Test.Repositories;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private IAccountRepository _accountRepo;
        public AccountsController()
        {
            _accountRepo = new AccountRepository();
        }
        // GET: api/Accounts


        [HttpGet( Name = "GetAll")]
        public IActionResult  Get()
        {
            return Ok(_accountRepo.Get());
        }

        // GET: api/Accounts/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            Accounts account = _accountRepo.GetById(id);
            if(account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpGet(Name = "Refresh")]
        public IActionResult Refresh()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            return Ok(_accountRepo.Get());
        }

        [HttpPost(Name = "AddFollowedAccount")]
        public IActionResult AddFollowedAccount([FromBody] string phoneNumber)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            Accounts addAccount = _accountRepo.AddAccountByPhoneNumber(a,phoneNumber);
            if(addAccount == null)
            {
                return BadRequest(new { message = "Utilisateur Inexistant" });
            }
            else
            {
                return (Ok(addAccount));
            }

        }

        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }

    }
}
