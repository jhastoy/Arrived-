using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Test.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private IPositionRepository _accountRepo;

        public PositionsController()
        {
            _accountRepo = new PositionRepository();
        }

        // GET: api/Positions
        [Route("/api/[controller]/GetAll")]

        [HttpGet]
        public ActionResult<IEnumerable<Positions>> Get()
        {
            return Ok(_accountRepo.Get());
        }
        [Route("/api/[controller]/Get")]
        // GET: api/Positions/Get/5
        [HttpGet("{id}")]
        public ActionResult<Positions> Get(int id)
        {
            Positions p = _accountRepo.GetPositionById(id);
            if (p == null)
            {
                return NotFound();
            }
            return Ok(p);
        }
        [Authorize]
        [Route("/api/[controller]/GetUserPositions")]
        // GET: api/Positions/GetUserPositions
        [HttpGet]
        public ActionResult<IEnumerable<Positions>> GetByUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IEnumerable<Positions> positions = _accountRepo.GetAllPositionsByIdAccount(GetIdByToken(identity));
            return Ok(positions);
        }
        [Authorize]
        [Route("/api/[controller]/GetLastUserPosition")]
        // GET: api/Positions/GetLastUserPosition
        [HttpGet]
        public ActionResult<Positions> GetLastByUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            Positions positions = _accountRepo.GetLastPositionByIdAccount(GetIdByToken(identity));
            return Ok(positions);
        }

        
        [Authorize]
        [HttpPost]
        /*
        public ActionResult PostPositions(Positions position)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            _accountRepo.Get
            position.IdaccountPosition = GetIdByToken(identity);
            _accountRepo.AddPosition(position);
            return Ok();
        }
       

        // DELETE: api/Positions/5
        /*[HttpDelete("{id}")]
        public async Task<ActionResult<Positions>> DeletePositions(int id)
        {
            var positions = await _context.Positions.FindAsync(id);
            if (positions == null)
            {
                return NotFound();
            }

            _context.Positions.Remove(positions);
            await _context.SaveChangesAsync();

            return positions;
        }
        */
        public int GetIdByToken(ClaimsIdentity identity )
        {
            IEnumerable<Claim> claim = identity.Claims;
            return int.Parse(claim.Where(c => c.Type == "Id").Select(c => c.Value).SingleOrDefault());
        }
    }
}
