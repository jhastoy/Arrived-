using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class Travels
    {
        public int IdTravel { get; set; }
        public int NameTravel { get; set; }
        public int TimeTravel { get; set; }
        public int IdstartTravel { get; set; }
        public int IdendTravel { get; set; }
        public int IdaccountTravel { get; set; }
        public int IdbraceletTravel { get; set; }

        public virtual Accounts IdaccountTravelNavigation { get; set; }
        public virtual Bracelets IdbraceletTravelNavigation { get; set; }
        public virtual Places IdendTravelNavigation { get; set; }
        public virtual Places IdstartTravelNavigation { get; set; }
    }
}
