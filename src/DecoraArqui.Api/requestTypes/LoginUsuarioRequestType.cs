using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using decorArqui.Enums;

namespace decorArqui.RequestTypes
{
    public class LoginUsuarioRequestType
    {
        public string? Usuario { get; set; }
        public string? Senha { get; set; }
    }
}