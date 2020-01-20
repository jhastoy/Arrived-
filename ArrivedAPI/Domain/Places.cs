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
        public virtual string LatitudePlace { get; set; }
        public virtual string LongitudePlace { get; set; }


        public virtual Accounts AccountPlace { get; set; }
        public virtual Bracelets BraceletPlace { get; set; }
        public virtual ICollection<RecurrentTravels> TravelsPlace { get; set; }
    }
}
