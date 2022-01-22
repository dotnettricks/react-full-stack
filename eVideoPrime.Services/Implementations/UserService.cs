using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using eVideoPrime.Services.Interfaces;

namespace eVideoPrime.Services.Implementations
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo) : base(userRepo)
        {
            _userRepo = userRepo;
        }

        public bool DeleteUser(int id)
        {
            return _userRepo.DeleteUser(id);
        }

        public IEnumerable<User> GetAllUsers()
        {
            IEnumerable<User> users = _userRepo.GetAllUsers();
            return users;
        }
    }
}
