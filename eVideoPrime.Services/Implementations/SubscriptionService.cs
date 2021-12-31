using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using eVideoPrime.Services.Interfaces;

namespace eVideoPrime.Services.Implementations
{
    public class SubscriptionService : Service<Subscription>, ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepo;
        public SubscriptionService(ISubscriptionRepository subscriptionRepo, IRepository<Subscription> subsRepo) : base(subsRepo)
        {
            _subscriptionRepo = subscriptionRepo;
        }

        public Subscription GetUserSubscription(int UserId)
        {
            Subscription subscription = _subscriptionRepo.GetUserSubscription(UserId);
            return subscription;
        }
    }
}
