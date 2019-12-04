using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class AccountsAccounts
    {
        public int IdAccountFollower { get; set; }
        public int IdAccountFollowed { get; set; }

        public virtual Accounts IdAccountFollowedNavigation { get; set; }
        public virtual Accounts IdAccountFollowerNavigation { get; set; }
    }
}
