using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Places
    {
        public Places()
        {
        }

        public virtual int IdPlace { get; set; }
        public virtual string NamePlace { get; set; }
        public virtual int LatitudePlace { get; set; }
        public virtual int LongitudePlace { get; set; }


        public virtual Accounts AccountPlace { get; set; }
        public virtual Bracelets BraceletPlace { get; set; }
        public virtual ICollection<RecurrentTravels> TravelsPlace { get; set; }
    }
}
