using Microsoft.Extensions.Options;
using MongoDB.Driver;
using decorArqui.Models;
using decorArqui.Db;
using decorArqui.Enums;



namespace decorArqui.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _collection;
        private readonly ArquitetoService _arquitetoService;
        private readonly ClienteService _clienteService;

        public UsuarioService(IOptions<DatabaseSettings> projetoServices, ArquitetoService arquitetoService, ClienteService clienteService)
        {

            var mongoClient = new MongoClient(projetoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<Usuario>("Usuarios");
            _arquitetoService = arquitetoService;
            _clienteService = clienteService;
        }

        public async Task<Usuario> GetAsync(string nome, string senha) =>
           await _collection.Find(x => x.Nome == nome && x.Senha == senha).FirstOrDefaultAsync();

        public async Task<Usuario> GetByIdAsync(string? id) =>
            await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();


        public async Task RegisterAsync(Usuario usuario)
        {
            await _collection.InsertOneAsync(usuario);
        }
    }
}

