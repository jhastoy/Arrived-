using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Test.Repositories
{ 
    public class AccountRepository:Repository,IAccountRepository
    {
        public AccountRepository()
        {
        }
    
        public IEnumerable<Accounts> Get()
        {
            var allAccounts = Session.Query<Accounts>().ToList();
            return allAccounts;
        }

        public Accounts GetById(int id)
        {
            Accounts account = Session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
            return (account);
        }

        public Accounts Add(Accounts account)
        {
            Accounts baseAccount = Session.Query<Accounts>().Where(x => x.PhoneNumberAccount == account.PhoneNumberAccount).FirstOrDefault();
            if (baseAccount == null)
            {
                Session.SaveOrUpdate(account);
                Session.Flush();
                return account;
            }
            else
                return null;
        }

        public Accounts Authentificate(string email, string password)
        {
            Accounts account = Session.Query<Accounts>().Where(x => x.EmailAccount == email && x.PasswordAccount == password).SingleOrDefault();
            if (account == null)
            {
                return null;
            }
            else
                return account;

        }

        public Accounts GetAccountByPhoneNumber(string phoneNumber)
        {
            Accounts account = Session.Query<Accounts>().Where(x => x.PhoneNumberAccount == phoneNumber).SingleOrDefault();
            if (account == null)
            {
                return null;
            }
            else
                return account;
        }

        public Accounts AddAccountByPhoneNumber(Accounts account, string phoneNumber)
        {
            Accounts a = GetAccountByPhoneNumber(phoneNumber);
            a.Censure();
            if(a==null)
            {
                return null;
            }
            else
            {
                account.AccountsFollowed.Add(a);
                Session.SaveOrUpdate(account);
                Session.Flush();
            }
            return a;
        }



    }
}
