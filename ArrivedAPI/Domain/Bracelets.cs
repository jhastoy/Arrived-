using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Bracelets
    {
        public Bracelets()
        {
        }

        public virtual int IdBracelet { get; set; }
        public virtual int MaterialIdBracelet { get; set; }
        public virtual string NameBracelet { get; set; }
        public virtual string SurnameBracelet { get; set; }

        public virtual ICollection<Accounts> AccountsBracelet { get; set; }
        public virtual ICollection<Places> PlacesBracelet { get; set; }

    }
}
