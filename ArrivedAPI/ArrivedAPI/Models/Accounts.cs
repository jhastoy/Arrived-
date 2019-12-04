using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class Accounts
    {
        public Accounts()
        {
            AccountsAccountsIdAccountFollowedNavigation = new HashSet<AccountsAccounts>();
            AccountsAccountsIdAccountFollowerNavigation = new HashSet<AccountsAccounts>();
            AccountsBracelets = new HashSet<AccountsBracelets>();
            Externals = new HashSet<Externals>();
            Places = new HashSet<Places>();
            Travels = new HashSet<Travels>();
        }

        public int IdAccount { get; set; }
        public string PhonenumberAccount { get; set; }
        public string PasswordAccount { get; set; }
        public string EmailAccount { get; set; }
        public string NameAccount { get; set; }
        public string SurnameAccount { get; set; }

        public virtual ICollection<AccountsAccounts> AccountsAccountsIdAccountFollowedNavigation { get; set; }
        public virtual ICollection<AccountsAccounts> AccountsAccountsIdAccountFollowerNavigation { get; set; }
        public virtual ICollection<AccountsBracelets> AccountsBracelets { get; set; }
        public virtual ICollection<Externals> Externals { get; set; }
        public virtual ICollection<Places> Places { get; set; }
        public virtual ICollection<Travels> Travels { get; set; }
    }
}
