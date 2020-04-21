using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain;

namespace DAL.Repositories
{
    public class TravelRepository:Repository,ITravelRepository
    {
        public void AddOrUpdateTravel(Travel travel)
        {
            using(var session = SessionFactory.OpenSession())
            {
                session.SaveOrUpdate(travel);
                session.Flush();
                session.Close();
            }
           
        }

        public Travel GetTravelByIdAcount(int id)
        {
            Accounts travel;
            using (var session = SessionFactory.OpenSession())
            {
                 travel = session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
                session.Close();
            }
            
            return travel.TravelAccount;
        }
        public ICollection<Travel> GetFollowedTravelsByIdAcount(int id)
        {
            Accounts travel;
            using(var session = SessionFactory.OpenSession()) {
                travel = session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
                session.Close();
            }
            return travel.FollowedTravelsAccount;
        }

    }
}
