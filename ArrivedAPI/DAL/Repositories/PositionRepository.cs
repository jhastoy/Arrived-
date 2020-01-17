using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace DAL.Repositories
{
    public class PositionRepository:Repository,IPositionRepository
    {
        public PositionRepository()
        {
        }
        
        public IEnumerable<Positions> Get()
        {
            IEnumerable < Positions > positions = new List<Positions>();
            positions = Session.Query<Positions>().ToList();
            return positions;
        }

        public Positions GetPositionById(int id)
        {
            Positions p = Session.Query<Positions>().Where(x => x.IdPosition == id).FirstOrDefault();
            return p;
        }

        public IEnumerable<Positions> GetAllPositionsByIdAccount(int idAccount)
        {
            IEnumerable<Positions> positions = new List<Positions>();
            positions = Session.Query<Accounts>().Where(x => x.IdAccount == idAccount).FirstOrDefault().PositionsAccount ;
            return positions;
        }
        public Positions GetLastPositionByIdAccount(int idAccount)
        {
            IEnumerable<Positions> positions = new List<Positions>();
            positions = Session.Query<Accounts>().Where(x => x.IdAccount == idAccount).FirstOrDefault().PositionsAccount;
            DateTime date = positions.Max(p => p.DateTimePosition);
            Positions p3 = positions.Where(x => x.DateTimePosition ==date).FirstOrDefault();
            return p3;
        }

        public void AddPosition(Positions p)
        {
            Session.SaveOrUpdate(p);
            Session.Flush();
        }

    }
}
