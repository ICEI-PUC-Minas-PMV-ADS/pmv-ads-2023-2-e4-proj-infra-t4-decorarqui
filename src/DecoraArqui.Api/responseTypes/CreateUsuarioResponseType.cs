using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using decorArqui.Enums;

namespace decorArqui.ResponseTypes
{
    public class CreateUsuarioResponseType
    {

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string? Nome { get; set; }
        public TipoUsuario Tipo { get; set; }
        public dynamic Data { get; set; }

    }
}

