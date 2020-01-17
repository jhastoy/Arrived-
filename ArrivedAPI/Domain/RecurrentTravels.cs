using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class RecurrentTravels
    {
        public virtual int IdTravel { get; set; }
        public virtual int NameTravel { get; set; }
        public virtual int TimeTravel { get; set; }

        public virtual Accounts AccountTravel { get; set; }
        public virtual Bracelets BraceletTravel { get; set; }
        public virtual Places PlaceStartTravel { get; set; }
        public virtual Places PlaceEndTravel { get; set; }

        public RecurrentTravels()
        {
        }
    }

}
