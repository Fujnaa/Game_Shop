using MongoDB.Bson.Serialization.Attributes;

namespace game_shopV3.Models {

    public class User {

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Username {get; set;} = String.Empty;
        public byte[]? PasswordHash {get; set;}
        public byte[]? PasswordSalt {get; set;}
        public string? Email {get; set;} = String.Empty;
        public string? Path {get; set;} = String.Empty;

    }

}