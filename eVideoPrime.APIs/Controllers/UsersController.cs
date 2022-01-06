using eVideoPrime.DAL.Entities;
using eVideoPrime.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eVideoPrime.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUsersService _UsersService;
        public UsersController(IUsersService UsersService)
        {
            _UsersService = UsersService;
        }

        
        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _UsersService.GetAllUsers();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _UsersService.Delete(id);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
