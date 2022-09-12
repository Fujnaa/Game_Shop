using game_shopV3.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace game_shopV3.Services;

public class MongoDBService {
    private readonly IMongoCollection<Game> _gamesCollection;
    private readonly IMongoCollection<User> _usersCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _gamesCollection = database.GetCollection<Game>(mongoDBSettings.Value.GamesCollection);
        _usersCollection = database.GetCollection<User>(mongoDBSettings.Value.UsersCollection);
    }

    public async Task CreateGameAsync(Game game) {
        await _gamesCollection.InsertOneAsync(game);
        return;
    }

    public async Task CreateUserAsync(User user) {
        await _usersCollection.InsertOneAsync(user);
        return;
    }

    public async Task<List<Game>> GetGamesAsync() {
        return await _gamesCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<List<User>> GetUsersAsync() {
        return await _usersCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task AddToGameAsync(string id, string path, double price, double salePrice, bool onSale) {

        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        UpdateDefinition<Game> update = Builders<Game>.Update.Set("Path", path).Set("Price", price).Set("SalePrice", salePrice).Set("OnSale", onSale);
        await _gamesCollection.UpdateOneAsync(filter, update);
        return;
    }

    public async Task AddToUserAsync(string id, string path, string username, string email) {

        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        UpdateDefinition<User> update = Builders<User>.Update.Set("Path", path).Set("Username", username).Set("Email", email);
        await _usersCollection.UpdateOneAsync(filter, update);
        return;
    }

    public async Task<User> FindUserAsync (string username) {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Username", username);
        List<User> users =  await _usersCollection.Find(filter).ToListAsync();
        if(users.Count != 0)
            return users.FirstOrDefault();

        else return null;
    }

    /*public async Task AddImageToGameAsync(string id, string path) {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        UpdateDefinition<Game> update = Builders<Game>.Update.Set("Path", path);
        await _gamesCollection.UpdateOneAsync(filter, update);
        return;
    }*/

    public async Task DeleteGameAsync(string id) {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq("Id", id);
        await _gamesCollection.DeleteOneAsync(filter);
        return;
    }

    public async Task DeleteUserAsync(string id) {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        await _usersCollection.DeleteOneAsync(filter);
        return;
    }
}