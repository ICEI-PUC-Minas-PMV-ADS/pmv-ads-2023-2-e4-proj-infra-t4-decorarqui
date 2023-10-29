using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;

namespace decorArqui.Models
{

    [Table("Projeto")]
    public class Projeto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonElement("ClienteId")]
        public string? ClienteId { get; set; }
        
        [BsonElement("ClienteNome")]
        public string? ClienteNome { get; set; }

        [Required]
        [Display(Name = "Descrição")]
        [BsonElement("Descricao")]
        public string? Descricao { get; set; }
        
        public bool AceiteProposta { get; set; }
        
        public string? PropostaAceitoId { get; set; }
        
        public List<Proposta>? Propostas { get; set; } = new List<Proposta>();
        
        [BsonElement("Nome")]
        [Required]
        public string Nome { get; set; }
        [Required]
        [BsonElement("Email")]
        public string Email { get; set; }
        [Required]
        [BsonElement("Endereco")]
        public string Endereco { get; set; }
        
        [BsonElement("Preco")]
        [Required]
        public decimal Preco { get; set; }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        public void aceitarOrcamento(string orcamentoId)
        {
            PropostaAceitoId = orcamentoId;
            AceiteProposta = true;
        }
        
        public bool propostaEmAberto()
        {
            return PropostaAceitoId == null && AceiteProposta == false;
        }
    }
}