using System;
using System.Collections.Generic;

namespace ArrivedAPI.Models
{
    public partial class Externals
    {
        public int IdExternal { get; set; }
        public string PhonenumberExternal { get; set; }
        public string NameExternal { get; set; }
        public string SurnameExternal { get; set; }
        public int IdaccountExternals { get; set; }

        public virtual Accounts IdaccountExternalsNavigation { get; set; }
    }
}
