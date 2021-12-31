
using eVideoPrime.DAL.Entities;
using eVideoPrime.Models;

namespace eVideoPrime.DAL.Interfaces
{
    public interface IAuthRepository
    {
        UserModel ValidateUser(string Email, string Password);
        bool CreateUser(User user, string Role);
    }
}
