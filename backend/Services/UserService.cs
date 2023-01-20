using System.Security.Claims;
using game_shopV3.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace game_shopV3.Services
{

    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly IMongoCollection<User> _usersCollection;

        public UserService(IOptions<MongoDBSettings> mongoDBSettings, IHttpContextAccessor httpContextAccessor)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _usersCollection = database.GetCollection<User>(mongoDBSettings.Value.UsersCollection);
            _httpContextAccessor = httpContextAccessor;

        }

        public object? GetMyCredentials()
        {
            var name = String.Empty;
            var role = String.Empty;
            var path = String.Empty;
            var email = String.Empty;
            object result = null;

            if (_httpContextAccessor.HttpContext != null)
            {

                name = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
                role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                path = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.UserData);
                email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

                result = new { name, role, path, email};
            }

            return result;
        }


        public async Task CreateUserAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
            return;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _usersCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task AddToUserAsync(string id, string path, string username, string email)
        {

            FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
            UpdateDefinition<User> update = Builders<User>.Update.Set("Path", path).Set("Username", username).Set("Email", email);
            await _usersCollection.UpdateOneAsync(filter, update);
            return;
        }

        public async Task<User> FindUserAsync(string username)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq("Username", username);
            List<User> users = await _usersCollection.Find(filter).ToListAsync();
            if (users.Count != 0){
                return users.FirstOrDefault();
            }

            return null;
        }

        public async Task DeleteUserAsync(string id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
            await _usersCollection.DeleteOneAsync(filter);
            return;
        }

    }
}