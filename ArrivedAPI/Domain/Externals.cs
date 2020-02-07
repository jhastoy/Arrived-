using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Externals
    {
        public virtual int IdExternal { get; set; }
        public virtual string PhoneNumberExternal { get; set; }
        public virtual string NameExternal { get; set; }
        public virtual string SurnameExternal { get; set; }


        public Externals()
        {
        }
    }
}
