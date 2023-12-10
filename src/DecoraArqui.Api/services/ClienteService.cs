using Microsoft.Extensions.Options;
using decorArqui.Models;
using decorArqui.Db;
using MongoDB.Driver;

namespace decorArqui.Services
{
    public class ClienteService
    {
        private readonly IMongoCollection<Cliente> _collection;

        public ClienteService(IOptions<DatabaseSettings> projetoServices)
        {

            var mongoClient = new MongoClient(projetoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<Cliente>("Clientes");
        }
        public async Task<List<Cliente>> GetAsync() => await _collection.Find(x => true).ToListAsync();
        public async Task<Cliente> GetAsync(string? id) => await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Cliente> GetByUserAsync(string? id) => await _collection.Find(x => x.UsuarioId == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Cliente cliente) => await _collection.InsertOneAsync(cliente);
    }
}

