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
            Accounts account;
            using (var session = SessionFactory.OpenSession())
            {
                account= session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
                session.Close();
            }
            return (account);
        }

        public Accounts Add(Accounts account)
        {
            using (var session = SessionFactory.OpenSession())
            {
                Accounts baseAccount = session.Query<Accounts>().Where(x => x.PhoneNumberAccount == account.PhoneNumberAccount).FirstOrDefault();
                if (baseAccount == null)
                {
                    session.SaveOrUpdate(account);
                    session.Flush();
                    return account;
                }
                else
                    return null;
            }
        }
        public void Update(Accounts account)
        {
            using (var session = SessionFactory.OpenSession())
            {
                session.SaveOrUpdate(account);
                session.Flush();
                session.Close();
            }
        }
        public Accounts Authentificate(string email, string password)
        {

            Accounts account;
            using (var session = SessionFactory.OpenSession())
                 { account = session.Query<Accounts>().Where(x => x.EmailAccount == email && x.PasswordAccount == password).SingleOrDefault();
                session.Close();
            }
            if (account == null)
            {
                return null;
            }
            else
                return account;

        }

        public  Accounts GetAccountByPhoneNumber(string phoneNumber)
        {
            Accounts account;
            using (var session = SessionFactory.OpenSession())
            {
                account = session.Query<Accounts>().Where(x => x.PhoneNumberAccount == phoneNumber).SingleOrDefault();
                session.Close();
            }
            if (account == null)
            {
                return null;
            }
            else
                return account;
        }

        
        public Accounts SaveOrUpdateExpoToken(Accounts a,string expoToken)
        {
            using (var session = SessionFactory.OpenSession())
            {
                a.ExpoToken = expoToken;
                session.SaveOrUpdate(a);
                session.Flush();
                session.Close();
            }
           
            return a;
        }



    }
}
