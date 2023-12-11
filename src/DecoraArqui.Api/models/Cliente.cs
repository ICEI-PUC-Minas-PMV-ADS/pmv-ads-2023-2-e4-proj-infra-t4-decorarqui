using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace decorArqui.Models
{
    public class Cliente(string usuarioId, string nome, Endereco endereco) : Entity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string UsuarioId { get; private set; } = usuarioId;
        public string Nome { get; private set; } = nome;
        public Endereco Endereco { get; private set; } = endereco;
    }
}