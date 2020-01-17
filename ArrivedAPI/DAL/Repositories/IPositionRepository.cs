using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
namespace DAL.Repositories
{
    public interface IPositionRepository
    {
        IEnumerable<Positions> Get();
        Positions GetPositionById(int id);
        IEnumerable<Positions> GetAllPositionsByIdAccount(int idAccount);
        Positions GetLastPositionByIdAccount(int idAccount);
        void AddPosition(Positions a);
    }
}
