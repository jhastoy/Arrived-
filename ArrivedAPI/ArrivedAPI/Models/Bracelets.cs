using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class Bracelets
    {
        public Bracelets()
        {
            AccountsBracelets = new HashSet<AccountsBracelets>();
            Places = new HashSet<Places>();
            Travels = new HashSet<Travels>();
        }

        public int IdBracelet { get; set; }
        public int MaterialidBracelet { get; set; }
        public string NameBracelet { get; set; }
        public string SurnameBracelet { get; set; }

        public virtual ICollection<AccountsBracelets> AccountsBracelets { get; set; }
        public virtual ICollection<Places> Places { get; set; }
        public virtual ICollection<Travels> Travels { get; set; }
    }
}
