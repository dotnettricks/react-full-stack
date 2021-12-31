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
    public class PlanController : ControllerBase
    {
        IService<Plan> _planService;
        public PlanController(IService<Plan> planService)
        {
            _planService = planService;
        }

        [HttpGet]
        public IEnumerable<Plan> GetAll()
        {
            return _planService.GetAll();
        }

        [HttpGet("{id}")]
        public Plan Get(int id)
        {
            return _planService.Find(id);
        }

        [HttpPost]
        public IActionResult Add(Plan model)
        {
            try
            {
                _planService.Add(model);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Plan model)
        {
            try
            {
                if (id != model.Id)
                    return BadRequest();

                _planService.Update(model);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _planService.Delete(id);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
