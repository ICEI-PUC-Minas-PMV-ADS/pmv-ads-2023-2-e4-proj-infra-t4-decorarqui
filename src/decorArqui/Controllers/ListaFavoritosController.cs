using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using decorArqui.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace decorArqui.Controllers
{
    [Route("api/favoritos")]
    [ApiController]
    public class ListaFavoritosController : Controller
    {
        private  IMongoDatabase _database;
        public ListaFavoritosController(IMongoDatabase database)
        {
            _database = database;
        }


        public async Task<IActionResult> Get(string idUsuario)
        {
            if (string.IsNullOrEmpty(idUsuario))
            {
                return NotFound();
            }

            Cliente usuario = await _database.GetCollection<Cliente>("Usuario")
                    .Find(u => u.Id == idUsuario )
                    .FirstOrDefaultAsync();

            if (usuario.ListaDeFavoritos == null)
            {
                return NotFound();
            }

            return Ok(usuario.ListaDeFavoritos);
        }

        
        [HttpPut]
        public async Task<IActionResult> Update(string idUsuario, string[] listaDeFavoritos)
        {
            if (string.IsNullOrEmpty(idUsuario) || listaDeFavoritos == null)
            {
                return NotFound();
            }

            Cliente usuario = await _database.GetCollection<Cliente>("Usuario")
                .Find(u => u.Id == idUsuario).FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound();
            }

            var filtroArquitetos = Builders<Cliente>.Filter.In("Id", listaDeFavoritos);


            List<Cliente> arquitetosEncontrados = _database.GetCollection<Cliente>("Usuario")
                .Find(filtroArquitetos).ToList();

            if (arquitetosEncontrados.Count != listaDeFavoritos.Count())
            {
                return NotFound();
            }

            var filtroUsuario = Builders<Cliente>.Filter.Eq("Id", idUsuario);

            var update = Builders<Cliente>.Update.Set("ListaDeFavoritos", listaDeFavoritos);

            _database.GetCollection<Cliente>("Usuario")
                .UpdateOne(filtroUsuario, update);

            return Ok(usuario);
        }
    }
}

