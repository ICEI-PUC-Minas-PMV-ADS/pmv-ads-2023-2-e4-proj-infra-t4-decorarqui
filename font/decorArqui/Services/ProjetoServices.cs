using decorArqui_RF06_07.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace decorArqui_RF06_07.Services
{
    public class ProjetoServices
    {
        private readonly IMongoCollection<Projeto> _projetoCollection;

        public ProjetoServices(IOptions<ProjetoDatabaseSettings> projetoServices)
        {

            var mongoClient = new MongoClient(projetoServices.Value.connectionString);
            var mongoDatabase = mongoClient.GetDatabase(projetoServices.Value.DatabaseName);

            _projetoCollection = mongoDatabase.GetCollection<Projeto>(projetoServices.Value.ProjetoCollectionName);
        }

        public async Task<List<Projeto>> GetAsync() => 
            await _projetoCollection.Find(x => true).ToListAsync();
        public async Task<Projeto> GetAsync(string id) => 
            await _projetoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync (Projeto projeto) => 
            await _projetoCollection.InsertOneAsync(projeto);
        public async Task UpdateAsync (string id, Projeto projeto) => 
            await _projetoCollection.ReplaceOneAsync(x=>x.Id == id , projeto);
        public async Task RemoveAsync (string id) => 
            await _projetoCollection.DeleteOneAsync(x=> x.Id == id);

    }
}
