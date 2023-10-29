using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace decorArqui.Models
{
    public class Proposta
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [Required]
        public string? ProjetoId { get; set; }
        
        public Projeto? Projeto { get; set; }
        
        public string? ClienteId { get; set; }

        
        public Cliente Cliente { get; set; }

        [Required]
        public string? ArquitetoId { get; set; }

        public Arquiteto Arquiteto { get; set; }

        [Required]
        [Display(Name = "Descrição")]
        public string? Descricao { get; set; }

        [Required]
        [Display(Name = "Orçamento")]

        public double? Orcamento { get; set; }
        public bool AceiteProposta { get; set; }
    }
}