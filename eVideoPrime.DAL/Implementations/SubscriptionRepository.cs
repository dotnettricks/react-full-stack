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
        public IEnumerable<Subscription> GetAllUserSubscription()
        {
            // return dbContext.Subscriptions.ToList();
            IEnumerable<Subscription> subs = (from s in dbContext.Subscriptions
                                              join ur in dbContext.Users on s.UserId equals ur.Id
                                              join p in dbContext.Plans on s.PlanId equals p.Id
                                              select new Subscription
                                              {
                                                  Id = s.Id,
                                                  UserId = s.UserId,
                                                  SubscribedOn = s.SubscribedOn,
                                                  ExpiryOn = s.ExpiryOn,
                                                  PlanId = s.PlanId,
                                                  UserName = ur.Name,
                                                  PlanName = p.Name
                                              }).ToList();
            return subs;
        }

    }
}
