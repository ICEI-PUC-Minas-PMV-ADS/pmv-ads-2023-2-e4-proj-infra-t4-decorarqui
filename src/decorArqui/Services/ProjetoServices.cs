using decorArqui.Models;
using decorArqui.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace decorArqui.Services
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

        public async Task<List<Projeto>> GetAsync() => //listagem dos projetos cadastrados
            await _projetoCollection.Find(x => true).ToListAsync();
        public async Task<Projeto> GetAsync(string id) =>
            await _projetoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Projeto projeto) => //criação de novo projeto
            await _projetoCollection.InsertOneAsync(projeto);
        public async Task UpdateAsync(string id, Projeto projeto) //Editar o projeto cadastrado
        {
            var filter = Builders<Projeto>.Filter.Eq(x => x.Id, id);
            var update = Builders<Projeto>.Update
                .Set(x => x.Nome, projeto.Nome)
                .Set(x => x.Endereco, projeto.Endereco)
                .Set(x => x.Email, projeto.Email)
                .Set(x => x.Descricao, projeto.Descricao)
                .Set(x => x.Preco, projeto.Preco);
            await _projetoCollection.UpdateOneAsync(filter, update);
        }
        public async Task RemoveAsync(string id) => //metodo de remoção do projeto
            await _projetoCollection.DeleteOneAsync(x => x.Id == id);


    }
}
