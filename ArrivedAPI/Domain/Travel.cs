using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Google.Maps;


namespace Domain
{
    public class Travel
    {
        public virtual Accounts TravellerTravel { get; set; }
        public virtual Accounts FollowerTravel { get; set; }
        public virtual Places StartPlaceTravel { get; set; }
        public virtual Places EndPlaceTravel { get; set; }
        public virtual DateTime DurationTravel { get; set; }
        public virtual string TransportTypeTravel { get; set; }
        public virtual string[] WarningsTravel { get; set; }

        public virtual void  CalculateDuration()
        {
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
            var request = new Google.Maps.DistanceMatrix.DistanceMatrixRequest();
            request.AddOrigin(new Location("8 RUE DES REMPARTS BORDEAUX"));
            request.AddDestination(new Location("1252 Route de cazenave Orx"));
            request.Mode = TravelMode.driving;
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var result = response.GetResponseAsync(request).Result.Rows[0].Elements[0].duration;


        }
    }
}
