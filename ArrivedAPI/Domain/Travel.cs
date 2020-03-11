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


        public virtual Places StartPlaceTravel { get; set; }
        public virtual Places EndPlaceTravel { get; set; }
        public virtual Positions StartPositionTravel { get; set; }
        public virtual Positions EndPositionTravel { get; set; }

        public virtual DateTime StartDateTravel { get; set; }
        public virtual DateTime EndDateTravel { get; set; }

        public virtual int TransportTypeTravel { get; set; }
        public virtual ICollection<Positions> UserPositionsTravel { get; set; }
        public virtual int BaseDistanceTravel { get; set; }
        public virtual ICollection<int> UserDistanceTravel { get; set; }
        public virtual double ProgressionTravel { get; set; }

        public Travel() { }
        public Travel(DateTime startDate,DateTime endDate,int transportType,double progression)
        {
            StartDateTravel = startDate;
            EndDateTravel = endDate;
            TransportTypeTravel = transportType;
            ProgressionTravel = progression;
        }
        public Travel(Accounts traveller, ICollection<Accounts> follower, Places startPlace, Places endPlace, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();


            StartPlaceTravel = startPlace;
            EndPlaceTravel = endPlace;
            StartPositionTravel = StartPlaceTravel.PositionPlace;
            EndPositionTravel = EndPlaceTravel.PositionPlace;

            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Accounts traveller, ICollection<Accounts> follower, Positions startPosition, Places endPlace, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();

            StartPositionTravel = startPosition;
            EndPlaceTravel = endPlace;
            EndPositionTravel = EndPlaceTravel.PositionPlace;

            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Accounts traveller, ICollection<Accounts> follower, Positions startPosition, Positions endPosition, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();


            StartPositionTravel = startPosition;
            EndPositionTravel = endPosition;
            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Positions startPosition, Positions endPosition, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();

            StartPositionTravel = startPosition;
            EndPositionTravel = endPosition;
            TransportTypeTravel = transportType;
            InitDates();
            InitDistance();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Positions startPosition, Places endPlace, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();

            StartPositionTravel = startPosition;
            EndPlaceTravel = endPlace;
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
            var request = MatrixRequest(StartPositionTravel.LatitudePosition + " " + StartPositionTravel.LongitudePosition);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var distance = response.GetResponseAsync(request).Result.Rows[0].Elements[0].distance;
            return FormatDistance(distance.ToString());
        }
        public virtual DateTime  CalculateDuration()
        {
            var request = MatrixRequest(StartPositionTravel.LatitudePosition + " " + StartPositionTravel.LongitudePosition);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var duration = response.GetResponseAsync(request).Result.Rows[0].Elements[0].duration;
            return FormatDuration(duration.ToString());
        }

        public virtual DateTime FormatDuration(string googleDuration)
        {
            var format = googleDuration;
            Console.WriteLine(format.IndexOf("hour"));
            Console.WriteLine(format.IndexOf("hours"));

            if (format.IndexOf("hour") == -1 && format.IndexOf("hours") == -1)
            {
                format = "00:" + format.Replace(" mins ", "");
            }
            else
            {
                format = format.Replace(" mins ", "").Replace(" hours ", ":").Replace(" hour ", ":");
            }
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
            if(EndPositionTravel != null)
                request.AddDestination(new Location(EndPositionTravel.LatitudePosition + " " + EndPositionTravel.LongitudePosition));
            else
                request.AddDestination(new Location(EndPlaceTravel.PositionPlace.LatitudePosition + " " + EndPlaceTravel.PositionPlace.LongitudePosition));

            switch (TransportTypeTravel)
            {
                case 1:
                    request.Mode = TravelMode.driving;
                    break;
                case 2:
                    request.Mode = TravelMode.walking;
                    break;
                case 3:
                    request.Mode = TravelMode.bicycling;
                    break;
                case 4:
                    request.Mode = TravelMode.transit;
                    break;
            }
            return request;
        }
        public virtual void Update()
        {
            var request = MatrixRequest(UserPositionsTravel.Last().LatitudePosition + " " + UserPositionsTravel.Last().LongitudePosition);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService().GetResponseAsync(request).Result.Rows[0].Elements[0];
            var duration = FormatDuration(response.duration.ToString());
            EndDateTravel = StartDateTravel.AddHours(duration.Hour).AddMinutes(duration.Minute);
            UserDistanceTravel.Add( FormatDistance(response.distance.ToString()));
            ProgressionTravel = 100 - ((double)UserDistanceTravel.Last() / (double)BaseDistanceTravel) * 100;
        }
        public virtual bool IsArrived()
        {
            if(ProgressionTravel >= 98)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public virtual Positions GetLastPosition()
        {
            return UserPositionsTravel.Last();
        }

        
    }
}
