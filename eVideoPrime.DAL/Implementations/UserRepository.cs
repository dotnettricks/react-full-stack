using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace eVideoPrime.DAL.Implementations
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public UserRepository(DbContext dbContext) : base(dbContext)
        {

        }


        public IEnumerable<User> GetAllUsers()
        {
            IEnumerable<User> users = dbContext.Users.ToList();
            return users;
        }

        public bool DeleteUser(int id)
        {
            User user = dbContext.Users.Include(u => u.Roles).Where(u => u.Id == id).FirstOrDefault();
            if (user != null)
            {
                var subscriptions = dbContext.Subscriptions.Where(s => s.UserId == user.Id).ToList();
                if (subscriptions.Count > 0)
                    dbContext.Subscriptions.RemoveRange(subscriptions);

                foreach (var role in user.Roles)
                {
                    user.Roles.Remove(role);
                }

                dbContext.Users.Remove(user);
                dbContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
