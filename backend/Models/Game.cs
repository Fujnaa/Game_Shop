using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace game_shopV3.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Path { get; set; }
        public string[]? Categories { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public bool OnSale { get; set; }
    }
}