using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FromBodyClasses
{
    public class TravelFromBody
    {
        public int[] FollowerAccountsIds { get; set; }
        public int  StartPlaceId { get; set; }
        public int  EndPlaceId { get; set; }
        public virtual Positions StartPositionTravel { get; set; }
        public virtual Positions EndPositionTravel { get; set; }
        public virtual int TransportTypeTravel { get; set; }

    }
}
