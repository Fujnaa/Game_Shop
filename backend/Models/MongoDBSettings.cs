namespace game_shopV3.Models;

public class MongoDBSettings {
    public string ConnectionURI {get; set;} = null!;
    public string DatabaseName {get; set;} = null!;
    public string GamesCollection {get; set;} = null!;

    public string UsersCollection {get; set;} = null!;
}