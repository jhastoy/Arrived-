using NHibernate;
using NHibernate.Cfg;

namespace Test.Repositories
{
    /// <summary>
    /// Superclasse de tous les repository
    /// Donne accès aux objets NHibernate nécessaires pour interagir avec la BD
    /// </summary>
    public abstract class Repository
    {
        private static ISessionFactory sessionFactory;
        private static ISession session;

        protected static ISessionFactory SessionFactory
        {
            get
            {
                // Crée l'objet SessionFactory au premier accès (lazy loading)
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
                // Crée l'objet Session au premier accès (lazy loading)
                if (session == null)
                {
                    session = SessionFactory.OpenSession();
                }
                return session;
            }
        }
    }
}
