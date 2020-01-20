using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain;

namespace Test.Repositories
{
    public class TravelRepository:Repository,ITravelRepository
    {
        public void AddOrUpdateTravel(Travel travel)
        {
            Session.SaveOrUpdate(travel);
            Session.Flush();
        }

        public Travel GetTravelByIdAcount(int id)
        {
            Accounts travel = Session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
            return travel.TravelAccount;
        }
        public ICollection<Travel> GetFollowedTravelsByIdAcount(int id)
        {
            Accounts travel = Session.Query<Accounts>().Where(x => x.IdAccount == id).FirstOrDefault();
            return travel.FollowedTravelsAccount;
        }

    }
}
