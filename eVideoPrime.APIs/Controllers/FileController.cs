using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using eVideoPrime.Services.Interfaces;
using eVideoPrime.DAL.Entities;

namespace eVideoPrime.Web.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        IWebHostEnvironment _env;
        IMovieService _movieService;
        public FileController(IWebHostEnvironment env, IMovieService movieService)
        {
            _env = env;
            _movieService = movieService;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var formCollection = Request.ReadFormAsync().Result;
                var file = formCollection.Files.First();
                var folderPath = "wwwroot/images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = "/images/" + fileName;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete]
        public IActionResult DeleteFile(string imageUrl)
        {
            //delete existing file
            if (System.IO.File.Exists(_env.WebRootPath + imageUrl))
            {
                System.IO.File.Delete(_env.WebRootPath + imageUrl);
                return Ok();
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult UploadFiles()
        {
            try
            {
                var formCollection = Request.ReadFormAsync().Result;
                int id = Convert.ToInt32(formCollection["id"]);

                var files = formCollection.Files;
                var folderPath = "wwwroot/images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);

                List<string> filesPaths = new List<string>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        var filePath = "/images/" + fileName;
                        filesPaths.Add(filePath);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }
                Movie model = new Movie { Id = id, Thumbnail = filesPaths[0], Banner = filesPaths[1] };
                _movieService.UpdateImages(model);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
