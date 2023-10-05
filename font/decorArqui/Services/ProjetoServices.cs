using decorArqui.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace decorArqui.Services
{
    public class ProjetoServices
    {
        private readonly IMongoCollection<Usuario> _usuarioCollection;

        public ProjetoServices(IOptions<decorArquiDatabaseSettings> projetoServices)
        {

            var mongoClient = new MongoClient(projetoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _usuarioCollection = mongoDatabase.GetCollection<Usuario>(projetoServices.Value.CollectionName);
        }

        public async Task<List<Usuario>> GetAsync() => 
            await _usuarioCollection.Find(x => true).ToListAsync();
        public async Task<Usuario> GetAsync(string id) => 
            await _usuarioCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync (Usuario projeto) => 
            await _usuarioCollection.InsertOneAsync(projeto);
        public async Task UpdateAsync (string id, Usuario projeto) => 
            await _usuarioCollection.ReplaceOneAsync(x=>x.Id == id , projeto);
        public async Task RemoveAsync (string id) => 
            await _usuarioCollection.DeleteOneAsync(x=> x.Id == id);

    }
}
