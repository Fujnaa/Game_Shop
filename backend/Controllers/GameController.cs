using System;
using Microsoft.AspNetCore.Mvc;
using game_shopV3.Services;
using game_shopV3.Models;
using Microsoft.AspNetCore.Cors;

namespace game_shopV3.Controllers;

[Controller]
//[Route ("api/[controller]")]
[EnableCors("MyAllowSpecificOrigins")]
[Route ("api/games")]
public class GameController : ControllerBase {

    private readonly MongoDBService _mongoDBService;

    public GameController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<Game>> Get() {
        return await _mongoDBService.GetAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Game game){
        await _mongoDBService.CreateAsync(game);
        return CreatedAtAction(nameof(Get), new { id = game.Id}, game);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AddToGame(string id, string path, double price, double salePrice, bool onSale) {
        await _mongoDBService.AddToGameAsync(id, path, price, salePrice, onSale);
        return NoContent();
    }

    /*[HttpPut("{id}")]
    public async Task<IActionResult> AddImageToGame(string id, string path) {
        await _mongoDBService.AddImageToGameAsync(id, path);
        return NoContent();
    }*/

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id){
        await _mongoDBService.DeleteAsync(id);
        return NoContent();
    }
}