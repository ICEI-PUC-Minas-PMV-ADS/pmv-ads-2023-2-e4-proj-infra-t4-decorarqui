using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using decorArqui.Models;
using static decorArqui.Models.Usuario;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(string id)
        {
            var usuario = await _database.GetCollection<Usuario>("Usuario").Find(u => u.Id == id).FirstOrDefaultAsync();
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpPost("CreateCliente")]
        public async Task<IActionResult> CreateCliente(Cliente model)
        {
            try
            {
                // Verifique se o email não está duplicado, se necessário.
                var existingUsuario = await _database.GetCollection<Cliente>("Usuario").Find(u => u.Email == model.Email).FirstOrDefaultAsync();
                if (existingUsuario != null)
                {
                    ModelState.AddModelError("Email", "Este email já está em uso.");
                    return BadRequest(ModelState);
                }

                // Agora você tem um objeto de Cliente, basta inseri-lo no banco de dados.
                await _database.GetCollection<Cliente>("Usuario").InsertOneAsync(model);

                return RedirectToAction("Login", "Home", model);
            }
            catch (Exception ex)
            {
                // Log do erro, se necessário.
                return StatusCode(500, "Ocorreu um erro interno ao criar o cliente.");
            }
        }

        [HttpPost("CreateArquiteto")]
        public async Task<IActionResult> CreateArquiteto(Arquiteto model)
        {
            try
            {
                // Verifique se o email não está duplicado, se necessário.
                var existingUsuario = await _database.GetCollection<Arquiteto>("Usuario").Find(u => u.Email == model.Email).FirstOrDefaultAsync();
                if (existingUsuario != null)
                {
                    ModelState.AddModelError("Email", "Este email já está em uso.");
                    return BadRequest(ModelState);
                }

                // Agora você tem um objeto de Arquiteto, basta inseri-lo no banco de dados.
                await _database.GetCollection<Arquiteto>("Usuario").InsertOneAsync(model);

                return RedirectToAction("Login", "Home", model);
            }
            catch (Exception ex)
            {
                // Log do erro, se necessário.
                return StatusCode(500, "Ocorreu um erro interno ao criar o arquiteto.");
            }
        }

        // Outros métodos do controlador API


        [HttpPut("{id}")]
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

        [HttpDelete("{id}")]
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
