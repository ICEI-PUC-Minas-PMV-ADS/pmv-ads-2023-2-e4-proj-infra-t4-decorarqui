using Microsoft.Extensions.Options;
using decorArqui.Models;
using decorArqui.Db;
using MongoDB.Driver;

namespace decorArqui.Services
{
    public class ProjetoService
    {
        private readonly IMongoCollection<Projeto> _collection;

        public ProjetoService(IOptions<DatabaseSettings> projetoServices)
        {

            var mongoClient = new MongoClient(projetoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<Projeto>("Projetos");
        }
        public async Task<List<Projeto>> GetAsync() => await _collection.Find(x => true).ToListAsync();
        public async Task<Projeto> GetAsync(string? id) => await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Projeto> GetByClientAsync(string? id) => await _collection.Find(x => x.ClienteId == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Projeto cliente) => await _collection.InsertOneAsync(cliente);
    }
}



