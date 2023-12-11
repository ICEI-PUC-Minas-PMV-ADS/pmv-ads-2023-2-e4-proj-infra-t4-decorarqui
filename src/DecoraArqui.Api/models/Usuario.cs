using decorArqui.Enums;

namespace decorArqui.Models
{
    public class Usuario(string nome, string email, string senha, string imageUrl, TipoUsuario tipo) : Entity
    {
        public string Nome { get; private set; } = nome;
        public string Email { get; private set; } = email;
        public string Senha { get; private set; } = senha;
        public string ImageUrl { get; private set; } = imageUrl;
        public TipoUsuario Tipo { get; private set; } = tipo;
    }
}