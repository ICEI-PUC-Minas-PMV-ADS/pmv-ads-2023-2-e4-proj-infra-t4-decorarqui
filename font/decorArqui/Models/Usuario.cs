using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace decorArqui.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; } 
        public string? Senha { get; set; }
        public string? Tipo { get; set; }
        public string? Descricao { get; set; }
        public decimal? Preco { get; set; }


    }
}