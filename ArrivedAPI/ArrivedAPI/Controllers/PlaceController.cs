﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Domain.FromBodyClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Repositories;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        IAccountRepository _accountRepo;
        public PlaceController()
        {
            _accountRepo = new AccountRepository();
        }
        [Authorize]
        [Route("[action]")]
        [HttpPost]
        public IActionResult AddPlaceAccount([FromBody] Places place)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));
            if(a.PlacesAccount == null)
            {
                a.PlacesAccount = new List<Places>();
            }
            a.PlacesAccount.Add(place);
            _accountRepo.Update(a);
            return (Ok(place));
        }
        [Authorize]
        [Route("[action]")]
        [HttpPut]
        public IActionResult DeletePlaceAccount([FromBody] Places place)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Accounts a = _accountRepo.GetById(GetIdByToken(identity));

            Places placeToRemove = a.PlacesAccount.Where(x => x.IdPlace == place.IdPlace).FirstOrDefault();
            a.PlacesAccount.Remove(placeToRemove);
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