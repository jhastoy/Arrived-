using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Warnings
    {
        public virtual int IdWarning { get; set; }
        public virtual string MessageWarning { get; set; }
        public virtual int TypeWarning { get; set; }
        public virtual DateTime DateWarning { get; set; }

        public Warnings() { }

        public Warnings(int typeWarning)
        {
            DateWarning = DateTime.Now ;

            switch(typeWarning)
            {
                case 3:
                    MessageWarning = "Danger signalé par l'utilisateur.";
                    break;
            }
        }

    }
}
