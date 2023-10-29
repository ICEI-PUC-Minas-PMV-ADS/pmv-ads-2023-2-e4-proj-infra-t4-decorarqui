using decorArqui.Models;
using decorArqui.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace decorArqui.Services
{
    public class ArquitetoServices
    {
        private IMongoDatabase _db;

        public ArquitetoServices(IMongoDatabase database)
        {
            _db = database;
        }


        public async Task<ArquitetoViewModel> GetArquitetoAsync(string id)
        {
            var arquitetoViewModel = new ArquitetoViewModel();

            var orcamentosEmAberto = await _db.GetCollection<Proposta>("Proposta")
                .Find(c => c.AceiteProposta == false && c.ArquitetoId == id)
                .ToListAsync();

            List<string> orcamentoIds = orcamentosEmAberto.Select(o => o.Id).ToList();

            var orcamentosAceitos = await _db.GetCollection<Proposta>("Proposta")
                .Find(c => c.AceiteProposta == true && c.ArquitetoId == id)
                .ToListAsync();

            var orcamentoAceitoIds = await _db.GetCollection<Projeto>("Projeto")
                .Find(c => c.AceiteProposta == true)
                .Project(c => c.PropostaAceitoId)
                .ToListAsync();

            List<string> orcamentosRecusadosIds = orcamentoIds.Where(id => !orcamentoAceitoIds.Contains(id)).ToList();

            var orcamentosRecusados = await _db.GetCollection<Proposta>("Proposta")
                .Find(c => orcamentosRecusadosIds.Contains(c.Id) && c.ArquitetoId == id)
                .ToListAsync();

            var propostasSemOrcamento = await _db.GetCollection<Projeto>("Projeto")
                .Find(c => c.AceiteProposta == false && !orcamentoIds.Contains(c.PropostaAceitoId))
                .ToListAsync();

            var arquiteto = await _db.GetCollection<Arquiteto>("Usuario")
                .Find(c => c.Id == id)
                .FirstOrDefaultAsync();

            arquitetoViewModel.PropostasEmAberto = orcamentosEmAberto;
            arquitetoViewModel.PropostasAceitas = orcamentosAceitos;
            arquitetoViewModel.ProjetosSemOrcamento = propostasSemOrcamento;
            arquitetoViewModel.PropostasRecusados = orcamentosRecusados;
            arquitetoViewModel.Arquiteto = arquiteto;
            arquitetoViewModel.ArquitetoId = arquiteto.Id;
            
            return arquitetoViewModel;
        }
    }
}
