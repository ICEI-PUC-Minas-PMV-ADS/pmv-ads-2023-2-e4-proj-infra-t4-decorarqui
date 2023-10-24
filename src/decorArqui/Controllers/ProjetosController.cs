using decorArqui.Models;
using decorArqui.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;

namespace decorArqui.Controllers
{
    [Route("api/projetos")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        private readonly ProjetoServices _projetoServices;

        public ProjetosController(ProjetoServices projetoServices)
        {
            _projetoServices = projetoServices;
        }

        [HttpGet]//api de listagem dos projetos cadastrados
        public async Task<List<Projeto>> GetProjetos()
            => await _projetoServices.GetAsync();

        [HttpPost]//api de cadastro dos projetos
        public async Task<Projeto> PostProjeto(Projeto projeto)
        {
            await _projetoServices.CreateAsync(projeto);

            return projeto;
        }

        [HttpDelete("{id}")]//api de excluir projetos cadastrados
        public async Task<IActionResult> Excluir (string id)
        {
            await _projetoServices.RemoveAsync(id);
            return NoContent();
        }
        [HttpPut("{id}")]//api para editar os projetos cadastrados por meio do ID.
        public async Task<IActionResult> Editar(string id, [FromBody] Projeto projeto)
        {
            if (string.IsNullOrEmpty(id) || projeto == null)
            {
                return BadRequest("ID ou objeto Projeto inválidos.");
            }

            // verificar se o projeto com o ID especificado existe
            var projetoExistente = await _projetoServices.GetAsync(id);
            if (projetoExistente == null)
            {
                return NotFound("Projeto não encontrado.");
            }

            try
            {
                await _projetoServices.UpdateAsync(id, projeto);
                return Ok("Projeto atualizado com sucesso.");
            }
            catch (Exception ex)
            {
                //retorno do erro para facilitar na tratativa.
                return StatusCode(500, "Erro ao atualizar o projeto: " + ex.Message);
            }
        }



    }
}
