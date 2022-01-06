using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.DAL.Interfaces
{
    public interface IUsersRepository : IRepository<User>
    {
        IEnumerable<User> GetAllUsers();
    }
}
