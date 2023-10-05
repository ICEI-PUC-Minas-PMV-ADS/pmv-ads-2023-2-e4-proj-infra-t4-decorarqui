using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace decorArqui.Models
{
    public class Register
    {

        [Required]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Senha")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Required]
        [Display(Name = "Tipo")]
        public string Tipo { get; set; }
        
        [BsonElement("Descrição")]
        public string? Descricao { get; set; }

        [BsonElement("Preço")]
        public decimal? Preco { get; set; }

    }
}
