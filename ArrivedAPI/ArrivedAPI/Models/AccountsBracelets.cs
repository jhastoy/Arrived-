using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class AccountsBracelets
    {
        public int IdAccountBracelet { get; set; }
        public int IdBraceletAccount { get; set; }

        public virtual Accounts IdAccountBraceletNavigation { get; set; }
        public virtual Bracelets IdBraceletAccountNavigation { get; set; }
    }
}
