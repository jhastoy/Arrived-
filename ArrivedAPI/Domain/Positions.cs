using System;
using System.Collections.Generic;

namespace Domain
{
    public partial class Positions
    {
        public virtual int IdPosition { get; set; }
        public virtual DateTime DateTimePosition { get; set; }
        public virtual double LatitudePosition { get; set; }
        public virtual double LongitudePosition { get; set; }

        public virtual Accounts AccountPosition { get; set; }

        public Positions()
        {
        }
    }
}
