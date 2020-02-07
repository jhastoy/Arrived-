using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArrivedAPI.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Domain;
using Test.Repositories;

namespace ArrivedAPI.Services
{
    public interface IAccountService
    {
        Accounts Authenticate(string Accountsname, string password);
    }

    public class AccountService : IAccountService
    {


        private readonly AppSettings _appSettings;

        public AccountService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public Accounts Authenticate(string email, string password)
        {

            IAccountRepository repo = new AccountRepository();
            Accounts user = repo.Authentificate(email, password);
            if (user == null)
            {
                return null;
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("Id", user.IdAccount.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            return user;
        }
    }

    }
