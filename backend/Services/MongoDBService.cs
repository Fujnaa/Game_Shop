using game_shopV3.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace game_shopV3.Services;

public class MongoDBService {
    private readonly IMongoCollection<Game> _gamesCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _gamesCollection = database.GetCollection<Game>(mongoDBSettings.Value.CollectionName);
    }

    public async Task CreateAsync(Game game) {
        await _gamesCollection.InsertOneAsync(game);
        return;
    }

    public async Task<List<Game>> GetAsync() {
        return await _gamesCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task AddToGameAsync(string id, string path, double price, double salePrice, bool onSale) {

        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        UpdateDefinition<Game> update = Builders<Game>.Update.Set("Path", path).Set("Price", price).Set("SalePrice", salePrice).Set("OnSale", onSale);
        await _gamesCollection.UpdateOneAsync(filter, update);
        return;
    }

    /*public async Task AddImageToGameAsync(string id, string path) {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        UpdateDefinition<Game> update = Builders<Game>.Update.Set("Path", path);
        await _gamesCollection.UpdateOneAsync(filter, update);
        return;
    }*/

    public async Task DeleteAsync(string id) {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        await _gamesCollection.DeleteOneAsync(filter);
        return;
    }
}