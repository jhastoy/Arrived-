using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Places
    {
        public Places(string namePlace, string adressePlace, Positions positionPlace )
        {
            NamePlace = namePlace;
            AdressePlace = adressePlace;
            PositionPlace = positionPlace;
        }
        public Places() { }
        public virtual int IdPlace { get; set; }
        public virtual string NamePlace { get; set; }
        public virtual string AdressePlace { get; set; }
        public virtual Positions PositionPlace { get; set; }


    }
}
