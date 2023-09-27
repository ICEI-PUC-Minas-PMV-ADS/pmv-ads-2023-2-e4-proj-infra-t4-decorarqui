using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace decorArqui.Models
{
    public class Login
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
    }
}
