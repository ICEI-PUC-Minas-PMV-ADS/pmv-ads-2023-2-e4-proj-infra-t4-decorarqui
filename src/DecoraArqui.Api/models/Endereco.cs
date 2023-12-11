using decorArqui.Models;

namespace decorArqui.Models
{
    public class Endereco(string cidade, string estado)
    {
        public string Cidade { get; private set; } = cidade;
        public string Estado { get; private set; } = estado;
    }
}
