using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace eVideoPrime.DAL.Implementations
{
    public class UsersRepository : Repository<User>, IUsersRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public UsersRepository(DbContext dbContext) : base(dbContext)
        {

        }

        
        public IEnumerable<User> GetAllUsers()
        {
            IEnumerable<User> users = dbContext.Users.ToList();
            return users;
        }

    }
}
