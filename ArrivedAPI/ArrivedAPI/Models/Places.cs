using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class Places
    {
        public Places()
        {
            TravelsIdendTravelNavigation = new HashSet<Travels>();
            TravelsIdstartTravelNavigation = new HashSet<Travels>();
        }

        public int IdPlace { get; set; }
        public string NamePlace { get; set; }
        public int LatitudePlace { get; set; }
        public int LongitudePlace { get; set; }
        public int IdbraceletPlace { get; set; }
        public int IdaccountPlace { get; set; }

        public virtual Accounts IdaccountPlaceNavigation { get; set; }
        public virtual Bracelets IdbraceletPlaceNavigation { get; set; }
        public virtual ICollection<Travels> TravelsIdendTravelNavigation { get; set; }
        public virtual ICollection<Travels> TravelsIdstartTravelNavigation { get; set; }
    }
}
