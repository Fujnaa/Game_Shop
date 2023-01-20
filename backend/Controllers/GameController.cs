using System;
using Microsoft.AspNetCore.Mvc;
using game_shopV3.Services;
using game_shopV3.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace game_shopV3.Controllers;

[Controller]
//[Route ("api/[controller]")]
[Route ("api/games")]
[Authorize (Roles = "Admin")]
public class GameController : ControllerBase {

    private readonly GameService _gameService;

    public GameController(GameService gameService) {
        _gameService = gameService;
    }

    [HttpGet, AllowAnonymous]
    public async Task<List<Game>> Get() {
        return await _gameService.GetGamesAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Game game){
        await _gameService.CreateGameAsync(game);
        return CreatedAtAction(nameof(Get), new {id = game.Id}, game);
    }

    [HttpPut("{id}")]
    public async Task AddToGame(string id, string path, double price, double salePrice, bool onSale) {
        await _gameService.AddToGameAsync(id, path, price, salePrice, onSale);
        return;
    }

    /*[HttpPut("{id}")]
    public async Task<IActionResult> AddImageToGame(string id, string path) {
        await _mongoDBService.AddImageToGameAsync(id, path);
        return NoContent();
    }*/

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id){
        await _gameService.DeleteGameAsync(id);
        return NoContent();
    }
}