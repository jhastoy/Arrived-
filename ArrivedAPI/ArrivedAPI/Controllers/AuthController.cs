using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ArrivedAPI.Services;
using Domain;
using Test.Repositories;


namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAccountService _userService;
        public AuthController(IAccountService userService)
        {
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
            return Ok(user);
        }
        [Route("[action]")]
        [HttpPost]
        public IActionResult Register([FromBody] Accounts userParams)
        {
            IAccountRepository repo = new AccountRepository();
            var user = repo.Add(userParams);
            if(user == null)
                return BadRequest(new { message = "Utilisateur déjà existant" });

            return Ok( _userService.Authenticate(userParams.EmailAccount, userParams.PasswordAccount));
        }


    }
}
