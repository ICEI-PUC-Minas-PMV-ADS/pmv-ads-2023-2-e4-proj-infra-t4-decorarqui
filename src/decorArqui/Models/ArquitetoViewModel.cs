using System.ComponentModel.DataAnnotations;

namespace decorArqui.Models
{
    public class ArquitetoViewModel
    {
        public string? ArquitetoId { get; set; }
        
        [Display(Name = "Propostas em Aberto")]
        public List<Proposta> PropostasEmAberto { get; set; } = new List<Proposta>();
        
        [Display(Name = "Propostas Aceitas")]
        public List<Proposta> PropostasAceitas { get; set; } = new List<Proposta>();
        
        [Display(Name = "Propostas Recusadas")]
        public List<Proposta> PropostasRecusados { get; set; } = new List<Proposta>();
        
        [Display(Name = "Projetos sem Orçamento")]
        public List<Projeto> ProjetosSemOrcamento { get; set; } = new List<Projeto>();

        [Display(Name = "Arquiteto")]
        public Arquiteto Arquiteto { get; set; }
    }
}