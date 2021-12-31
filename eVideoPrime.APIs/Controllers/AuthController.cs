using eVideoPrime.DAL.Entities;
using eVideoPrime.Models;
using eVideoPrime.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eVideoPrime.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult CreateUser(UserSignUpModel model)
        {
            User user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                PhoneNumber = model.PhoneNumber,
                CreatedDate = DateTime.Now
            };
            bool result = _authService.CreateUser(user, model.Role);
            if (result)
            {
                return StatusCode(StatusCodes.Status201Created);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPost]
        public UserModel ValidateUser(LoginModel model)
        {
            return _authService.ValidateUser(model.Username, model.Password);
        }
    }
}
