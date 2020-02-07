using System.Collections.Generic;


namespace Domain
{
    public partial class Accounts
    {
        public Accounts()
        {
        }

        public Accounts(int id, string phoneNumber, string name, string surname, bool inTravel)
        {
            IdAccount = id;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = inTravel;            
        }
        public Accounts(int id, string phoneNumber, string name, string surname, bool inTravel,Travel travelAccount)
        {
            IdAccount = id;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = inTravel;
            TravelAccount = travelAccount;
        }
        public Accounts(int id, string phoneNumber, string email, string name, string surname, bool inTravel, ICollection<Accounts> friendsAccount,Travel travelAccount, ICollection<Travel> followedTravelsAccount, string token)
        {
            IdAccount = id;
            EmailAccount = email;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = InTravel;
            FriendsAccount = new List<Accounts>();
            if (friendsAccount != null)
            {
                foreach (Accounts a in friendsAccount)
                {
                    FriendsAccount.Add(new Accounts(a.IdAccount, a.PhoneNumberAccount, a.NameAccount, a.SurnameAccount, a.InTravel));
                }
            }
            
            TravelAccount = travelAccount;
            InTravel = inTravel;
            FollowedTravelsAccount = followedTravelsAccount;
            Token = token;
        }
        public virtual int IdAccount { get; set; }
        public virtual string PhoneNumberAccount { get; set; }
        public virtual string PasswordAccount { get; set; }
        public virtual string EmailAccount { get; set; }
        public virtual string NameAccount { get; set; }
        public virtual string SurnameAccount { get; set; }
        public virtual string Token { get; set; }
        public virtual ICollection<Accounts> FriendsAccount { get; set; }
        public virtual ICollection<Bracelets> BraceletsAccount { get; set; }
        public virtual ICollection<Externals> ExternalsAccount { get; set; }
        public virtual ICollection<Places> PlacesAccount { get; set; }
        public virtual ICollection<Travel> FollowedTravelsAccount { get; set; }
        public virtual Travel TravelAccount { get; set; }
        public virtual bool InTravel { get; set; }

        public virtual void Censure()
        {
            this.PasswordAccount = null;
            this.EmailAccount = null;
            this.Token = null;

            this.BraceletsAccount = null;
            this.ExternalsAccount = null;
            this.PlacesAccount = null;

            this.TravelAccount = null;
            this.FollowedTravelsAccount = null;
            foreach(Accounts a in FriendsAccount)
            {
                a.FriendsAccount = null;
            }
        }
        public virtual void LoginCensure()
        {
            this.PasswordAccount = null;
            this.BraceletsAccount = null;
            this.ExternalsAccount = null;
            this.PlacesAccount = null;
            if (FriendsAccount != null)
            {
                foreach (Accounts a in FriendsAccount)
                {
                    a.FriendsAccount = null;
                    a.FollowedTravelsAccount = null;
                }
            }
        }


    }
}
