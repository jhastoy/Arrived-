using Google.Maps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    class Program
    {
        static void Main(string[] args)
        {
            GoogleSigned.AssignAllServices(new GoogleSigned("AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I"));
            var request = new Google.Maps.DistanceMatrix.DistanceMatrixRequest();
            request.AddOrigin(new Location("8 RUE DES REMPARTS BORDEAUX"));
            request.AddDestination(new Location("1252 Route de cazenave Orx"));
            request.Mode = TravelMode.driving;


            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var result = response.GetResponseAsync(request).Result.Rows[0].Elements[0].duration;
            
            Console.WriteLine(result);
            Console.ReadLine();
        }
    }
}
