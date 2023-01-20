using System;
using Microsoft.AspNetCore.Mvc;
using game_shopV3.Services;
using game_shopV3.Models;
using Microsoft.AspNetCore.Cors;
using System.Security.Cryptography;
using game_shopV3.Dto;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace game_shopV3.Controllers;

[Controller]
//[Route ("api/[controller]")]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UserController : ControllerBase
{

    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    public static User user = new User();

    public UserController(IUserService userService, IConfiguration configuration)
    {
        _configuration = configuration;
        _userService = userService;
    }

    [HttpGet]
    public async Task<List<User>> Get()
    {
        return await _userService.GetUsersAsync();
    }

    [HttpGet]
    [Route("credentials"), AllowAnonymous]
    public ActionResult<object> GetMe()
    {
        var result = _userService.GetMyCredentials();
        return Ok(result);
    }

    [HttpPost("register"), AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] UserDto request)
    {

        if (await _userService.FindUserAsync(request.Username) != null)
        {
            return BadRequest("User with the same Username already exists.");

        }

        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        user.Id = "";
        user.Username = request.Username;
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.Email = request.Email;
        user.Path = request.Path;

        await _userService.CreateUserAsync(user);
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }

    [HttpPost("login"), AllowAnonymous]
    public async Task<ActionResult<string>> Login(UserDto request)
    {

        user = await _userService.FindUserAsync(request.Username);

        if (user == null)
            return BadRequest("User not found.");

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            return BadRequest("Wrong Password.");

        string token = await CreateToken(user);
        return Ok(token);

    }

    private async Task<string> CreateToken(User user)
    {

        List<Claim> claims = new List<Claim>();

        var loggedUser = await _userService.FindUserAsync(user.Username);

        if (user.Username == "Vuk")
        {
            claims = new List<Claim> {

                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.UserData, loggedUser.Path),
                new Claim(ClaimTypes.Email, loggedUser.Email)

            };
        }

        else
        {
            claims = new List<Claim> {
                
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Regular"),
                new Claim(ClaimTypes.UserData, loggedUser.Path),
                new Claim(ClaimTypes.Email, loggedUser.Email)

            };
        }
    


    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
        _configuration.GetSection("AppSettings:Token").Value));

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: creds
    );

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
{
    using (var hmac = new HMACSHA512())
    {
        passwordSalt = hmac.Key;
        //GetBytes will encode the string into bytes
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }
}

//Turn in the password, make hash again and compare the passwordHash and computedHash
private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
{
    using (var hmac = new HMACSHA512(passwordSalt))
    {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }
}

[HttpPut("{id}")]
public async Task<IActionResult> AddToUser(string id, string path, string username, string email)
{
    await _userService.AddToUserAsync(id, path, username, email);
    return NoContent();
}

/*[HttpPut("{id}")]
public async Task<IActionResult> AddImageToGame(string id, string path) {
    await _mongoDBService.AddImageToGameAsync(id, path);
    return NoContent();
}*/

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(string id)
{
    await _userService.DeleteUserAsync(id);
    return NoContent();
}
}