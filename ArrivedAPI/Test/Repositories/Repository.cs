using NHibernate;
using NHibernate.Cfg;

namespace Test.Repositories
{
    /// <summary>
    /// Superclasse de tous les repository
    /// Donne acc�s aux objets NHibernate n�cessaires pour interagir avec la BD
    /// </summary>
    public abstract class Repository
    {
        private static ISessionFactory sessionFactory;
        private static ISession session;

        protected static ISessionFactory SessionFactory
        {
            get
            {
                // Cr�e l'objet SessionFactory au premier acc�s (lazy loading)
                if (sessionFactory == null)
                {
                    sessionFactory = new Configuration().Configure().BuildSessionFactory();
                }
                return sessionFactory;
            }
        }

        protected static ISession Session
        {
            get
            {
                // Cr�e l'objet Session au premier acc�s (lazy loading)
                if (session == null)
                {
                    session = SessionFactory.OpenSession();
                }
                return session;
            }
        }
    }
}
