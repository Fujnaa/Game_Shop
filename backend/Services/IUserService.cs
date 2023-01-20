using game_shopV3.Models;

namespace game_shopV3.Services {

    public interface IUserService {

        object? GetMyCredentials();

        Task CreateUserAsync(User user);

        Task<List<User>> GetUsersAsync();

        Task AddToUserAsync(string id, string path, string username, string email);

        Task<User?>? FindUserAsync(string username);

        Task DeleteUserAsync(string id);
    }
}