using decorArqui.Models;
using decorArqui.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;

namespace decorArqui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        private readonly ProjetoServices _projetoServices;

        public ProjetosController(ProjetoServices projetoServices)
        {
            _projetoServices = projetoServices;
        }

        [HttpGet]
        public async Task<List<Usuario>> GetProjetos()
            => await _projetoServices.GetAsync();

        [HttpPost]
        public async Task<Usuario> PostProjeto([FromBody] Usuario projeto)
        {
            await _projetoServices.CreateAsync(projeto);

            return projeto;
        }



        [HttpDelete]
        public async void Excluir(string id)
        {
            await _projetoServices.RemoveAsync(id);
        }
       
       

    }
}
