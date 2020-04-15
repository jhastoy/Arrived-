using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Test.Repositories
{
    public interface IAccountRepository
    {
        IEnumerable<Accounts> Get();
        Accounts GetById(int id);

        Accounts Add(Accounts a);
        Accounts Authentificate(string email, string password);

        Accounts GetAccountByPhoneNumber(string phoneNumber);
        void Update(Accounts account);
        Accounts SaveOrUpdateExpoToken(Accounts a, string expoToken);

    }
}
