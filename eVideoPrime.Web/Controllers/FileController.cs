using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace eVideoPrime.Web.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        IWebHostEnvironment _env;
        IConfiguration _config;
        Uri apiBaseAddress;
        HttpClient _httpClient;
        public FileController(IWebHostEnvironment env, IConfiguration config)
        {
            _env = env;
            _config = config;
            apiBaseAddress = new Uri(_config["ApiAddress"]);
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = apiBaseAddress;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var formCollection = Request.ReadFormAsync().Result;
                var file = formCollection.Files.First();
                var folderPath = "ClientApp/public/images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = "images/" + fileName;

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
                var folderPath = "ClientApp/public/images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);

                List<string> filesPaths = new List<string>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        var filePath = "images/" + fileName;
                        filesPaths.Add(filePath);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }
                var model = new { Id = id, Thumbnail = filesPaths[0], Banner = filesPaths[1] };
                StringContent content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json");
                var response = _httpClient.PostAsync(_httpClient.BaseAddress + "/movie/UpdateImages", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
