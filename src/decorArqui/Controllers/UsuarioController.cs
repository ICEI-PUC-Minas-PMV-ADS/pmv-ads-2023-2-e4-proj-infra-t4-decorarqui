using decorArqui.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace decorArqui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IMongoDatabase _database;

        public UsuarioController(IMongoDatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<ActionResult<Usuario>> GetUsuario(string id)
        {
            var usuario = await _database.GetCollection<Usuario>("Usuario").Find(u => u.Id == id).FirstOrDefaultAsync();
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login(Login model)
        {
            try
            {
                if (model.Tipo == "cliente")
                {
                    // Lógica para login de cliente
                    var cliente = await _database.GetCollection<Cliente>("Usuario")
                        .Find(c => c.Email == model.Email && c.Senha == model.Senha && c.Tipo == model.Tipo /*&& c.Nome == model.Nome*/)
                        .FirstOrDefaultAsync();

                    if (cliente != null)
                    {
                        // Cliente logado com sucesso
                        // Redirecione para a página de cliente
                        HttpContext.Session.SetString("Nome", cliente.Nome);
                        HttpContext.Session.SetString("Email", cliente.Email);
                        return RedirectToAction("Cliente", "Home", model);
                    }
                }
                else if (model.Tipo == "arquiteto")
                {
                    // Lógica para login de arquiteto
                    var arquiteto = await _database.GetCollection<Arquiteto>("Usuario")
                        .Find(a => a.Email == model.Email && a.Senha == model.Senha)
                        .FirstOrDefaultAsync();

                    if (arquiteto != null)
                    {
                        // Arquiteto logado com sucesso
                        // Redirecione para a página de arquiteto
                        HttpContext.Session.SetString("Nome", arquiteto.Nome);
                        HttpContext.Session.SetString("Email", arquiteto.Email);
                        return RedirectToAction("Arquiteto", "Home", model);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro: " + ex.Message);
                return BadRequest(new { mensagem = "Ocorreu um erro durante o login: " + ex.Message });
            }
            return BadRequest(new { mensagem = "Email ou senha incorretos" });

        }

        [HttpPut]
        public async Task<IActionResult> UpdateUsuario(string id, Usuario model)
        {
            var existingUsuario = await _database.GetCollection<Usuario>("Usuario").Find(u => u.Id == id).FirstOrDefaultAsync();
            if (existingUsuario == null)
            {
                return NotFound();
            }

            // Atualize os campos necessários em existingUsuario com base em model.

            await _database.GetCollection<Usuario>("Usuario").ReplaceOneAsync(u => u.Id == id, model);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUsuario(string id)
        {
            var result = await _database.GetCollection<Usuario>("Usuario").DeleteOneAsync(u => u.Id == id);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
