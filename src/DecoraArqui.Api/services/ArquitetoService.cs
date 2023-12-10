using Microsoft.Extensions.Options;
using decorArqui.Models;
using decorArqui.Db;
using MongoDB.Driver;

namespace decorArqui.Services
{
    public class ArquitetoService
    {
        private readonly IMongoCollection<Arquiteto> _collection;

        public ArquitetoService(IOptions<DatabaseSettings> projetoServices)
        {

            var mongoClient = new MongoClient(projetoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<Arquiteto>("Arquitetos");
        }
        public async Task<List<Arquiteto>> GetAsync() => await _collection.Find(x => true).ToListAsync();

        public async Task<Arquiteto> GetAsync(string? id) => await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Arquiteto> GetByUserAsync(string? id) => await _collection.Find(x => x.UsuarioId == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Arquiteto arquiteto) => await _collection.InsertOneAsync(arquiteto);

    }
}

