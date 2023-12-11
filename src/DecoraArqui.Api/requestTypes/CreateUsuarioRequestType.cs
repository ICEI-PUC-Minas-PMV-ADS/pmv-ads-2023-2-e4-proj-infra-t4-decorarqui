using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using decorArqui.Enums;

namespace decorArqui.RequestTypes
{
    public class CreateUsuarioRequestType
    {
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string? ImageUrl { get; set; }
        public string? Profissao { get; set; }
        public TipoUsuario Tipo { get; set; }
    }
}