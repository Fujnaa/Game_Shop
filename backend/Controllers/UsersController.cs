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

namespace game_shopV3.Controllers;

[Controller]
//[Route ("api/[controller]")]
[Route ("api/users")]
public class UserController : ControllerBase {

    private readonly MongoDBService _mongoDBService;
    private readonly IConfiguration _configuration;
    public static User user = new User();

    public UserController(MongoDBService mongoDBService, IConfiguration configuration) {
        _mongoDBService = mongoDBService;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<List<User>> Get() {
        return await _mongoDBService.GetUsersAsync();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto request){
        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        user.Username = request.Username;
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.Email = request.Email;
        user.Path = request.Path;

        await _mongoDBService.CreateUserAsync(user);
        return CreatedAtAction(nameof(Get), new {id = user.Id}, user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserDto request) {

        user = await _mongoDBService.FindUserAsync(request.Username);

        if(user == null)
            return BadRequest("User not found.");

        if(!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            return BadRequest("Wrong Password.");

        string token = CreateToken(user);
        return Ok(token);

    }

    private string CreateToken(User user){

        List<Claim> claims = new List<Claim> {
            new Claim(ClaimTypes.Name, user.Username)
        };

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

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
        using(var hmac = new HMACSHA512()) {
            passwordSalt = hmac.Key;
            //GetBytes will encode the string into bytes
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    //Turn in the password, make hash again and compare the passwordHash and computedHash
    private bool VerifyPasswordHash (string password, byte[] passwordHash, byte[] passwordSalt) {
        using(var hmac = new HMACSHA512(passwordSalt)) {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AddToUser(string id, string path, string username, string email) {
        await _mongoDBService.AddToUserAsync(id, path, username, email);
        return NoContent();
    }

    /*[HttpPut("{id}")]
    public async Task<IActionResult> AddImageToGame(string id, string path) {
        await _mongoDBService.AddImageToGameAsync(id, path);
        return NoContent();
    }*/

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id){
        await _mongoDBService.DeleteUserAsync(id);
        return NoContent();
    }
}