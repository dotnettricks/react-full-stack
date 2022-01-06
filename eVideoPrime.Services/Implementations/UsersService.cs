using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using eVideoPrime.Services.Interfaces;

namespace eVideoPrime.Services.Implementations
{
    public class UsersService : Service<User>, IUsersService
    {
        private readonly IUsersRepository _userRepo;

        public UsersService(IUsersRepository userRepo, IRepository<User> usersRepo) : base(usersRepo)
        {
            _userRepo = userRepo;
        }

        
        public IEnumerable<User> GetAllUsers()
        {
            IEnumerable<User> users = _userRepo.GetAllUsers();
            return users;
        }
    }
}
