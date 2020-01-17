using System.Collections.Generic;


namespace Domain
{
    public partial class Accounts
    {
        public Accounts()
        {
        }

        public virtual int IdAccount { get; set; }
        public virtual string PhoneNumberAccount { get; set; }
        public virtual string PasswordAccount { get; set; }
        public virtual string EmailAccount { get; set; }
        public virtual string NameAccount { get; set; }
        public virtual string SurnameAccount { get; set; }
        public virtual string Token { get; set; }
        public virtual ICollection<Accounts> AccountsFollowed { get; set; }
        public virtual ICollection<Accounts> AccountsFollower { get; set; }
        public virtual ICollection<Bracelets> BraceletsAccount { get; set; }
        public virtual ICollection<Externals> ExternalsAccount { get; set; }
        public virtual ICollection<Places> PlacesAccount { get; set; }
        public virtual ICollection<Positions> PositionsAccount { get; set; }
        public virtual ICollection<RecurrentTravels> TravelsAccount { get; set; }

        public virtual void Censure()
        {
            this.PasswordAccount = null;
            this.EmailAccount = null;
            this.Token = null;
            this.AccountsFollowed = null;
            this.BraceletsAccount = null;
            this.ExternalsAccount = null;
            this.PlacesAccount = null;
            this.PositionsAccount = null;
            this.TravelsAccount = null;
        }
    }
}
