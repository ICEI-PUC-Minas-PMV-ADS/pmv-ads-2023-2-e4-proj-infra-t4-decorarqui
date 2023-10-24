using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace decorArqui.Models
{

    [Table("Projeto")]
    public class Projeto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Nome")]
        [Required]
        public string Nome { get; set; } = null;
        [Required]
        [BsonElement("E-mail")]
        public string Email { get; set; } = null;
        [Required]
        [BsonElement("Endereço")]
        public string Endereco { get; set; } = null;
        [Required]
        [BsonElement("Descrição")]
        public string Descricao { get; set; } = null;
        [BsonElement("Preço")]
        [Required]
        public decimal Preco { get; set; }
    }
}
