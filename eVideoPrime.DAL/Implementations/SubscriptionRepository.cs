using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace eVideoPrime.DAL.Implementations
{
    public class SubscriptionRepository : Repository<Subscription>, ISubscriptionRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public SubscriptionRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public Subscription GetUserSubscription(int UserId)
        {
            return dbContext.Subscriptions.Where(c => c.UserId == UserId).FirstOrDefault();
        }
    }
}
