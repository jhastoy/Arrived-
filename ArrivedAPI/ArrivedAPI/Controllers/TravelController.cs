using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Test.Repositories;
using System.Security.Claims;
using Domain.FromBodyClasses;
using Microsoft.AspNetCore.Authorization;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private ITravelRepository _travelRepo ;
        private IAccountRepository _accountRepo;

        public TravelController()
        {
            _travelRepo = new TravelRepository();
            _accountRepo = new AccountRepository();
        }
        [Authorize]
        [Route("[action]")]
        [HttpPost]
        public IActionResult AddTravel([FromBody] TravelFromBody t)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            List<Accounts> followerAccount = new List<Accounts>();
            foreach(int i in t.FollowerAccountsIds)
            {
                followerAccount.Add(_accountRepo.GetById(i));
            }
            Accounts user = _accountRepo.GetById(GetIdByToken(identity));

            
            Travel travel = new Travel(user, followerAccount, t.StartPositionTravel, t.EndPositionTravel, t.TransportTypeTravel);
            _travelRepo.AddOrUpdateTravel(travel);
            return Ok();
        }
        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetUserTravel()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Travel t = _travelRepo.GetTravelByIdAcount(GetIdByToken(identity));
            t.Censure();
            return Ok(t);
        }
        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetFollowedTravels()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            ICollection<Travel> t = _travelRepo.GetFollowedTravelsByIdAcount(GetIdByToken(identity));
            foreach(Travel travel in t)
            {
                travel.Censure();
            }
            return Ok(t);
        }
        public int GetIdByToken(ClaimsIdentity identity)
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }
    }
}