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
            Travel travel = new Travel("8 Rue des remparts, Bordeaux", "1252 ROUTE DE CAZENAVE ORX", 0);
            Console.WriteLine(travel.StartDateTravel);
            Console.WriteLine(travel.EndDateTravel);
            Console.WriteLine(travel.BaseDistanceTravel);
            Console.ReadLine();


        }
    }
}
