using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using decorArqui.Enums;

namespace decorArqui.Models
{
    public class Projeto(string clienteId, LocalDecoracao local, PlanoDecoracao plano, ComodoDecoracao comodo, PrazoDecoracao prazo, EstimativaLimiteDecoracao estimativa, string nome, string detalhes) : Entity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string ClienteId { get; set; } = clienteId;
        public LocalDecoracao Local { get; private set; } = local;
        public PlanoDecoracao Plano { get; private set; } = plano;
        public ComodoDecoracao Comodo { get; private set; } = comodo;
        public PrazoDecoracao Prazo { get; private set; } = prazo;
        public EstimativaLimiteDecoracao Estimativa { get; private set; } = estimativa;
        public string Nome { get; set; } = nome;
        public string Detalhes { get; set; } = detalhes;
    }
}
