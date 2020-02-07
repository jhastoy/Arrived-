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
        public void Update(Accounts account)
        {
            Session.SaveOrUpdate(account);
            Session.Flush();
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

        public Accounts AddFriendByPhoneNumber(Accounts account, string phoneNumber)
        {
            Accounts a = GetAccountByPhoneNumber(phoneNumber);
            if(a==null)
            {
                return null;
            }
            else
            {
                if(account.FriendsAccount == null)
                {
                    account.FriendsAccount = new List<Accounts>();
                }
                if (a.FriendsAccount == null)
                {
                    a.FriendsAccount = new List<Accounts>();
                }
                account.FriendsAccount.Add(a);
                a.FriendsAccount.Add(account);
                Session.SaveOrUpdate(account);
                Session.Flush();
                Session.SaveOrUpdate(a);
                Session.Flush();
            }
            return a;
        }



    }
}
