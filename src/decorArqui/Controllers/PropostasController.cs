using decorArqui.Models;
using decorArqui.Services;
using Microsoft.AspNetCore.Mvc;

namespace decorArqui.Controllers
{
    [Route("api/propostas")]
    [ApiController]
    public class PropostasController : ControllerBase
    {
        private readonly ArquitetoServices _arquitetoServices;
        
        public PropostasController(ArquitetoServices arquitetoServices)
        {
            _arquitetoServices = arquitetoServices;
        }

        [HttpGet]
        public async Task<ArquitetoViewModel> GetArquiteto(string id) =>  await _arquitetoServices.GetArquitetoAsync(id);

        [HttpPost]
        public async Task<ArquitetoViewModel> PostArquiteto(string id) => await _arquitetoServices.GetArquitetoAsync(id);

        [HttpDelete]
        public async Task<ArquitetoViewModel> Excluir (string id) => await _arquitetoServices.GetArquitetoAsync(id);

    }
}
