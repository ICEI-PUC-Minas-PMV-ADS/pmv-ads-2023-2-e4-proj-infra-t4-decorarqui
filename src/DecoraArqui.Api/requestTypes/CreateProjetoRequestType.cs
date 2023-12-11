using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using decorArqui.Enums;

namespace decorArqui.RequestTypes
{
    public class CreateProjetoRequestType
    {
        public string ClienteId { get; set; }
        public LocalDecoracao Local { get; set; }
        public PlanoDecoracao Plano { get; set; }
        public ComodoDecoracao Comodo { get; set; }
        public PrazoDecoracao Prazo { get; set; }
        public EstimativaLimiteDecoracao Estimativa { get; set; }
        public string Nome { get; set; }
        public string Detalhes { get; set; }
    }
}