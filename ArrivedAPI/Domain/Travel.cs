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
        public virtual bool IsPaused { get; set; }
        public virtual bool IsFinished { get; set; }

        public Travel() { }
        public Travel(DateTime startDate,DateTime endDate,int transportType,double progression,bool isPauded,bool isFinished)
        {
            StartDateTravel = startDate;
            EndDateTravel = endDate;
            TransportTypeTravel = transportType;
            ProgressionTravel = progression;
            IsPaused = isPauded;
            IsFinished = isFinished;

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
            InitTravel();
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
            InitTravel();
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
            InitTravel();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Positions startPosition, Positions endPosition, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();
            IsFinished = false;
            IsPaused = false;
            StartPositionTravel = startPosition;
            EndPositionTravel = endPosition;
            TransportTypeTravel = transportType;
            InitTravel();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public Travel(Positions startPosition, Places endPlace, int transportType)
        {
            UserPositionsTravel = new List<Positions>();
            UserDistanceTravel = new List<int>();
            UserDistanceTravel = new List<int>();
            IsFinished = false;
            IsPaused = false;
            StartPositionTravel = startPosition;
            EndPlaceTravel = endPlace;
            TransportTypeTravel = transportType;

            InitTravel();
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
        }
        public virtual void InitTravel()
        {
            var request = MatrixRequest(StartPositionTravel.LatitudePosition + " " + StartPositionTravel.LongitudePosition);
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var data = response.GetResponseAsync(request).Result.Rows[0].Elements[0];
            var duration = data.duration.Value;
            var distance = data.distance.Value;
            StartDateTravel = DateTime.Now;
            EndDateTravel = StartDateTravel.AddSeconds(duration);
            BaseDistanceTravel = (int)distance;
            Console.WriteLine("Duration : " + duration);
            Console.WriteLine("Distance : " + distance);
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
            EndDateTravel = StartDateTravel.AddSeconds(response.duration.Value);
            UserDistanceTravel.Add( (int)response.distance.Value);
            ProgressionTravel = 100 - ((double)UserDistanceTravel.Last() / (double)BaseDistanceTravel) * 100;
        }
        public virtual bool IsArrived()
        {
            if(ProgressionTravel >= 95)
            {
                IsFinished = true;
                return true;
            }
            return false;
        }

        public virtual Positions GetLastPosition()
        {
            return UserPositionsTravel.Last();
        }

        public virtual void PauseOrStart()
        {
            if(IsPaused)
            {
                IsPaused = false;
            }
            else
            {
                IsPaused = true;
            }
        }
        
    }
}
