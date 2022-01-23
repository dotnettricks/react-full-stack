using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace eVideoPrime.APIs.FIlters
{
    public class CustomAuthorize : Attribute, IAuthorizationFilter
    {
        public string Roles { get; set; }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            string authorization = context.HttpContext.Request.Headers["Authorization"];
            if (string.IsNullOrEmpty(authorization))
            {
                context.Result = new UnauthorizedResult();
            }
            else if(authorization.StartsWith("Bearer "))
            {
                try
                {
                    string token = authorization.Substring("Bearer ".Length).Trim();
                    if (!string.IsNullOrEmpty(token))
                    {
                        var config = context.HttpContext.RequestServices.GetService<IConfiguration>();
                        string jwtKey = config.GetValue<string>("Jwt:Key");
                        string jwtIssuer = config.GetValue<string>("Jwt:Issuer");
                        string jwtAudience = config.GetValue<string>("Jwt:Audience");

                        SecurityKey key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey));
                        TokenValidationParameters validationParameters =
                                new TokenValidationParameters
                                {
                                    ValidateIssuer = true,
                                    ValidIssuer = jwtIssuer,
                                    ValidAudiences = new[] { jwtAudience },
                                    ValidateIssuerSigningKey = true,
                                    IssuerSigningKey = key
                                };

                        SecurityToken validatedToken;
                        JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                        var user = handler.ValidateToken(token, validationParameters, out validatedToken);
                        if (!user.Identity.IsAuthenticated)
                        {
                            context.Result = new UnauthorizedResult();
                        }
                    }
                    else
                    {
                        context.Result = new UnauthorizedResult();
                    }
                }
                catch (Exception ex)
                {
                    context.Result = new StatusCodeResult(StatusCodes.Status500InternalServerError);
                }               
            }
            else
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
