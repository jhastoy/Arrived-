using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace Domain
{
    public partial class Accounts
    {
        public virtual int IdAccount { get; set; }
        public virtual string PhoneNumberAccount { get; set; }
        public virtual string PasswordAccount { get; set; }
        public virtual string EmailAccount { get; set; }
        public virtual string NameAccount { get; set; }
        public virtual string SurnameAccount { get; set; }
        public virtual string Token { get; set; }
        public virtual string ExpoToken { get; set; }
        public virtual ICollection<Accounts> FriendsAccount { get; set; }
        public virtual ICollection<Bracelets> BraceletsAccount { get; set; }
        public virtual ICollection<Externals> ExternalsAccount { get; set; }
        public virtual ICollection<Places> PlacesAccount { get; set; }
        public virtual ICollection<Travel> FollowedTravelsAccount { get; set; }
        public virtual Positions LastPositionAccount { get; set; }
        public virtual ICollection<Warnings> WarningsAccount { get; set; }
        public virtual Travel TravelAccount { get; set; }
        public virtual bool InTravel { get; set; }
        public virtual bool InDanger { get; set; }
        public virtual int AlertChoiceAccount { get; set; }
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
        public Accounts(int id, string phoneNumber, string name, string surname, bool inTravel,Travel travelAccount, bool inDanger,ICollection<Warnings> warningsAccount,Positions lastPositionAccount)
        {
            IdAccount = id;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = inTravel;
            TravelAccount = travelAccount;
            InDanger = inDanger;
            WarningsAccount = warningsAccount;
            LastPositionAccount = lastPositionAccount;
        }
        public Accounts(int id, string phoneNumber, string name, string surname, bool inTravel,  bool inDanger, ICollection<Warnings> warningsAccount, Positions lastPositionAccount)
        {
            IdAccount = id;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = inTravel;
            InDanger = inDanger;
            WarningsAccount = warningsAccount;
            LastPositionAccount = lastPositionAccount;
        }
        public Accounts(int id, string phoneNumber, string email, string name, string surname, bool inTravel,bool inDanger,Positions lastPositionAccount,ICollection<Warnings> warningsAccount, ICollection<Accounts> friendsAccount,Travel travelAccount, ICollection<Travel> followedTravelsAccount,ICollection<Places> placesAccount, string token, int alertChoiceAccount)
        {
            IdAccount = id;
            EmailAccount = email;
            PhoneNumberAccount = phoneNumber;
            NameAccount = name;
            SurnameAccount = surname;
            InTravel = InTravel;
            FriendsAccount = new List<Accounts>();
            InDanger = inDanger;
            LastPositionAccount = lastPositionAccount;
            WarningsAccount = warningsAccount;
            AlertChoiceAccount = alertChoiceAccount;
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
            PlacesAccount = placesAccount;
            Token = token;
        }

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
        public virtual void LaunchTravel()
        {
            InTravel = true;
            foreach (Accounts friend in FriendsAccount)
            {
                foreach (Travel followedTravel in friend.FollowedTravelsAccount)
                {
                    if (followedTravel.IdTravel == TravelAccount.IdTravel)
                    {
                        SendPushNotification(friend.ExpoToken, " a lancé un nouveau trajet.");
                    }
                }
            }
        }
        public virtual void IsArrived()
        {
            InTravel = false;
            foreach(Accounts friend in FriendsAccount)
            {
                foreach(Travel followedTravel in friend.FollowedTravelsAccount)
                {
                    if(followedTravel.IdTravel == TravelAccount.IdTravel)
                    {
                        SendPushNotification(friend.ExpoToken," est arrivé(e) à destination.");
                    }
                }
            }
        }
        public virtual void UserAlert()
        {
            InDanger = true;
            if (WarningsAccount == null)
            {
                WarningsAccount = new List<Warnings>();
            }
            WarningsAccount.Add(new Warnings(3));

            foreach (Accounts friend in FriendsAccount)
            {
                if(AlertChoiceAccount ==1)
                foreach (Travel followedTravel in friend.FollowedTravelsAccount)
                {
                    if (followedTravel.IdTravel == TravelAccount.IdTravel)
                    {
                        SendPushNotification(friend.ExpoToken, " est en danger !");
                    }
                }
                else
                {
                    SendPushNotification(friend.ExpoToken, " est en danger !");
                }
            }
        }
        public virtual void InitPreferences()
        {
            AlertChoiceAccount = 3;
        }
        public virtual dynamic SendPushNotification(string ExpoToken,string message)
        {
            dynamic body = new
            {
                to = ExpoToken,
                title = "Arrived!",
                body = SurnameAccount + message,
                sound = "default",
            };
            string response = null;
            using (WebClient client = new WebClient())
            {
                client.Headers.Add("accept", "application/json");
                client.Headers.Add("accept-encoding", "gzip, deflate");
                client.Headers.Add("Content-Type", "application/json");
                response = client.UploadString("https://exp.host/--/api/v2/push/send", JsonExtensions.SerializeToJson(body));
            }
            var json = JsonExtensions.DeserializeFromJson<dynamic>(response);
            return json;
        }

    }
}
