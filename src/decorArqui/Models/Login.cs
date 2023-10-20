using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace decorArqui.Models
{
    public class Login
    {
        public string? Id { get; set; }

        [Display(Name = "Nome")]
        public string? Nome { get; set; }

        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Display(Name = "Senha")]
        [DataType(DataType.Password)]
        public string? Senha { get; set; }

        [Display(Name = "Tipo")]
        public string? Tipo { get; set; }

        [Display(Name = "Descricao")]
        public string? Descricao { get; set; }

        [Display(Name = "Preco")]
        public double? Preco { get; set; }

        [Display(Name = "Instuicao")]
        public string? Instituicao { get; set; }

        [Display(Name = "Cursos")]
        public string? Cursos { get; set; }

        [Display(Name = "ListaDeFavoritos")]
        public string[]? ListaDeFavoritos { get; set; }

        [Display(Name = "ResumoProfissional")]
        public string? ResumoProfissional { get; set; }


        public bool? AceiteProposta { get; set; }


        public string? PropostaId { get; set; }
    }
}
