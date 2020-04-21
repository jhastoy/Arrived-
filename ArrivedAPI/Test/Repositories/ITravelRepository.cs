using System;
using System.Collections.Generic;
using System.Text;
using Domain;
namespace DAL.Repositories
{
    public interface ITravelRepository
    {
        void AddOrUpdateTravel(Travel travel);
        Travel GetTravelByIdAcount(int id);
        ICollection<Travel> GetFollowedTravelsByIdAcount(int id);

    }
}
