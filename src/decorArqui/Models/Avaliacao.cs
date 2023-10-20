using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace decorArqui.Models
{
    public class Avaliacao
    {
        [Required]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Required]
        [Display(Name = "Nota")]
        public string Nota { get; set; }

        [Required]
        [Display(Name = "Tipo")]
        public string Tipo { get; set; }

    }
}