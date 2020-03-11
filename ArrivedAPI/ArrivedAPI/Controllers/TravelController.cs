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
            var user = _accountRepo.GetById(GetIdByToken(identity));
            
            Travel travel;
            if (t.EndPositionTravel == null)
            {
                Places endPlace = user.PlacesAccount.Where(x => x.IdPlace == t.EndPlaceId).FirstOrDefault();
                Console.WriteLine(endPlace);
                travel = new Travel(t.StartPositionTravel, endPlace, t.TransportTypeTravel);
            }
            else
            {
                travel = new Travel(t.StartPositionTravel, t.EndPositionTravel, t.TransportTypeTravel);
            }
            foreach(int i in t.FollowerAccountsIds)
            {
                var follower = _accountRepo.GetById(i);
                if(follower.FollowedTravelsAccount == null)
                {
                    follower.FollowedTravelsAccount = new List<Travel>();
                }
                follower.FollowedTravelsAccount.Add(travel);
                _accountRepo.Update(follower);
            }

            user.TravelAccount = travel;
            user.LaunchTravel();            
            _accountRepo.Update(user);
            return Ok(true);
        }
        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetUserTravel()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var a = _accountRepo.GetById(GetIdByToken(identity));
            Travel t = new Travel(a.TravelAccount.StartDateTravel, a.TravelAccount.EndDateTravel, a.TravelAccount.TransportTypeTravel, a.TravelAccount.ProgressionTravel);
            return Ok(t);
        }
        [Authorize]
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetFollowedTravels()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = _accountRepo.GetById(GetIdByToken(identity));
            List<Accounts> followed = new List<Accounts>();
            
            foreach (Accounts a in user.FriendsAccount)
            {
                if (a.InTravel || a.InDanger)
                {
                    if (user.FollowedTravelsAccount != null && a.InTravel && user.FollowedTravelsAccount.Where(x => x.IdTravel == a.TravelAccount.IdTravel).FirstOrDefault() != null)
                    {
                        Accounts account = new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel, new Travel(a.TravelAccount.StartDateTravel, a.TravelAccount.EndDateTravel, a.TravelAccount.TransportTypeTravel, a.TravelAccount.ProgressionTravel), a.InDanger, a.WarningsAccount,a.LastPositionAccount);
                        followed.Add(account);
                    }
                    else
                    {
                        if (a.InDanger && a.AlertChoiceAccount > 1)
                        {
                            Accounts account = new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel, a.InDanger, a.WarningsAccount,a.LastPositionAccount);
                            followed.Add(account);
                        }
                    }
                                
                }
            }
            
            return Ok(followed);
        }

        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult UpdateUserPosition([FromBody] Positions[] positions)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            foreach(Positions p in positions)
            {
                a.TravelAccount.UserPositionsTravel.Add(p);
            }
            a.TravelAccount.Update();
            a.LastPositionAccount = a.TravelAccount.GetLastPosition();
            if (a.TravelAccount.IsArrived())
            {
                a.IsArrived();
                return Ok(true);
            }
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