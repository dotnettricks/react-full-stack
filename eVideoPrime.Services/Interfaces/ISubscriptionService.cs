using eVideoPrime.DAL.Entities;

namespace eVideoPrime.Services.Interfaces
{
    public interface ISubscriptionService : IService<Subscription>
    {
        Subscription GetUserSubscription(int UserId); 
      IEnumerable<Subscription> GetAllUserSubscription();
    }
}
