using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace decorArqui.Models
{
    public class Arquiteto(string usuarioId, string nome, Endereco endereco, string profissao, int avaliacao, int projetosConcluidos) : Entity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string UsuarioId { get; private set; } = usuarioId;
        public string Nome { get; private set; } = nome;
        public Endereco Endereco { get; private set; } = endereco;
        public string Profissao { get; private set; } = profissao;
        public int Avaliacao { get; private set; } = avaliacao;
        public int ProjetosConcluidos { get; set; } = projetosConcluidos;
    }
}