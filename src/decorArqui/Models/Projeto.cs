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
        public string Nome { get; set; }
        [Required]
        [BsonElement("Email")]
        public string Email { get; set; }
        [Required]
        [BsonElement("Endereco")]
        public string Endereco { get; set; }
        [Required]
        [BsonElement("Descricao")]
        public string Descricao { get; set; }
        [BsonElement("Preco")]
        [Required]
        public decimal Preco { get; set; }
    }
}
