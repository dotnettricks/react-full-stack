using eVideoPrime.DAL.Entities;

namespace eVideoPrime.Services.Interfaces
{
    public interface IUsersService : IService<User>
    {
      IEnumerable<User> GetAllUsers();
    }
}
