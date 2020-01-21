using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Positions
    {
        public virtual int IdPosition { get; set; }
        public virtual DateTime DateTimePosition { get; set; }
        public virtual string LatitudePosition { get; set; }
        public virtual string LongitudePosition { get; set; }


        public Positions()
        {
        }
    }
}
