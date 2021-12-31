using eVideoPrime.DAL.Entities;
using eVideoPrime.Models;

namespace eVideoPrime.Services.Interfaces
{
    public interface IAuthService
    {
        bool CreateUser(User user, string Password);
        UserModel ValidateUser(string Username, string Password);
    }
}
