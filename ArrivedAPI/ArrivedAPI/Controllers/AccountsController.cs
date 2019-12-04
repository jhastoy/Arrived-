using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ArrivedAPI.Models;

namespace ArrivedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        
        // GET: api/Accounts
        [HttpGet]
        public IActionResult  Get()
        {
            var context = new arrivedContext();
            IEnumerable<Accounts> allAccounts = context.Accounts;
            return Ok(allAccounts);
        }

        // GET: api/Accounts/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {

            var context = new arrivedContext();
            var account = context.Accounts.Where(x => x.IdAccount == id).FirstOrDefault();
            if(account == null)
            {
                return NotFound();
            }
            
            return Ok(account);
        }

        // POST: api/Accounts
        [HttpPost]
        public void Post([FromBody] string value)   
        {
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
