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
    public partial class Travel
    {
        public virtual int IdTravel { get; set; }
        public virtual Accounts TravellerTravel { get; set; }
        public virtual ICollection<Accounts> FollowerTravel { get; set; }

        public virtual Places StartPlaceTravel { get; set; }
        public virtual Places EndPlaceTravel { get; set; }
        public virtual string StartPositionTravel { get; set; }
        public virtual string EndPositionTravel { get; set; }

        public virtual DateTime StartDateTravel { get; set; }
        public virtual DateTime EndDateTravel { get; set; }

        public virtual int TransportTypeTravel { get; set; }
        public virtual string[] UserPositionsTravel { get; set; }
        public virtual int BaseDistanceTravel { get; set; }
        public virtual int UserDistanceTravel { get; set; }
        public virtual double ProgressionTravel { get; set; }
        public virtual string[] UserWarningsTravel { get; set; }

        public Travel() { }
        public Travel(Accounts traveller, ICollection<Accounts> follower, Places startPlace, Places endPlace, int transportType)
        {
            UserDistanceTravel = 0;
            TravellerTravel = traveller;
            FollowerTravel = follower;

            StartPlaceTravel = startPlace;
            EndPlaceTravel = endPlace;
            StartPositionTravel = StartPlaceTravel.LatitudePlace + " " + StartPlaceTravel.LongitudePlace;
            EndPositionTravel = EndPlaceTravel.LatitudePlace + " " + EndPlaceTravel.LongitudePlace;

            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Accounts traveller, ICollection<Accounts> follower, string startPosition, Places endPlace, int transportType)
        {
            UserDistanceTravel = 0;

            TravellerTravel = traveller;
            FollowerTravel = follower;
            StartPositionTravel = startPosition;
            EndPlaceTravel = endPlace;
            EndPositionTravel = EndPlaceTravel.LatitudePlace + " " + EndPlaceTravel.LongitudePlace;

            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Accounts traveller, ICollection<Accounts> follower, string startPosition, string endPosition, int transportType)
        {
            UserDistanceTravel = 0;

            TravellerTravel = traveller;
            FollowerTravel = follower;
            StartPositionTravel = startPosition;
            EndPositionTravel = endPosition;
            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(string startPosition, string endPosition, int transportType)
        {
            UserDistanceTravel = 0;

            StartPositionTravel = startPosition;
            EndPositionTravel = endPosition;
            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public virtual void InitDates()
        {
            StartDateTravel = DateTime.Now;
            DateTime duration = CalculateDuration();
            EndDateTravel = StartDateTravel.AddHours(duration.Hour).AddMinutes(duration.Minute);
        }
        public virtual void InitDistance()
        {
            BaseDistanceTravel = CalculateDistance();
        }
        public virtual int CalculateDistance()
        {
            var request = MatrixRequest(StartPositionTravel);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var distance = response.GetResponseAsync(request).Result.Rows[0].Elements[0].distance;
            return FormatDistance(distance.ToString());
        }
        public virtual DateTime  CalculateDuration()
        {
            var request = MatrixRequest(StartPositionTravel);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var duration = response.GetResponseAsync(request).Result.Rows[0].Elements[0].duration;
            return FormatDuration(duration.ToString());
        }

        public virtual DateTime FormatDuration(string googleDuration)
        {
            var format = googleDuration.Replace(" mins ", "").Replace(" hours ", ":").Replace(" hour ", ":");
            int index = format.IndexOf("(");
            format = format.Remove(index, 6);
            DateTime date = Convert.ToDateTime(format);
            return date;
        }
        public virtual int FormatDistance(string googleDistance)
        {
            googleDistance = googleDistance.Replace('.', ',');
            int indexKM = googleDistance.IndexOf("k");
            if (indexKM == -1)
            {
                int indexM = googleDistance.IndexOf("m");
                string distance = googleDistance.Remove(indexM, googleDistance.Length - indexM);
                return int.Parse(distance);
            }
            else
            {
                string distance = googleDistance.Remove(indexKM, googleDistance.Length - indexKM);
                double distanceM = double.Parse(distance) * 1000;
                return(int)Math.Round(distanceM);
            }
        }

        public virtual Google.Maps.DistanceMatrix.DistanceMatrixRequest MatrixRequest(string startPosition)
        {
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
            var request = new Google.Maps.DistanceMatrix.DistanceMatrixRequest();
            request.AddOrigin(new Location(startPosition));
            request.AddDestination(new Location(EndPositionTravel));
            switch(TransportTypeTravel)
            {
                case 0:
                    request.Mode = TravelMode.driving;
                    break;
                case 1:
                    request.Mode = TravelMode.walking;
                    break;
                case 2:
                    request.Mode = TravelMode.bicycling;
                    break;
                case 3:
                    request.Mode = TravelMode.transit;
                    break;
            }
            return request;
        }
        public virtual void Update()
        {
            var request = MatrixRequest(UserPositionsTravel.Last());
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService().GetResponseAsync(request).Result.Rows[0].Elements[0];
            EndDateTravel = response.duration
            UserDistanceTravel = FormatDistance(response.distance.ToString());
            ProgressionTravel = (UserDistanceTravel / BaseDistanceTravel) * 100;
        }
        public virtual void  Censure()
        {
            FollowerTravel = null;
            TravellerTravel = null;
        }
        
    }
}
