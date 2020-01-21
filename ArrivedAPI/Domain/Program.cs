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
            request.AddOrigin(new Location("44.840477 -0.579564"));
            request.AddDestination(new Location("43.609316 -1.357550"));
            var response = new Google.Maps.DistanceMatrix.DistanceMatrixService();
            var duration = response.GetResponseAsync(request).Result.Rows[0].Elements[0].duration;
            Console.WriteLine(duration);
            Console.ReadLine();

        }
    }
}
