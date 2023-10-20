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

            var usuario = await _database.GetCollection<Cliente>("Usuario")
                    .Find(u => u.Id == idUsuario )
                    .FirstOrDefaultAsync();

            if (usuario.ListaDeFavoritos == null)
            {
                return NotFound();
            }

            return View(usuario.ListaDeFavoritos);
        }

        
        [HttpPut]
        public async Task<IActionResult> Update(string idUsuario, string[] listaDeFavoritos)
        {
            if (string.IsNullOrEmpty(idUsuario) || listaDeFavoritos == null)
            {
                return NotFound();
            }

            Usuario usuario = await _database.GetCollection<Usuario>("Usuario")
                .Find(u => u.Id == idUsuario).FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound();
            }

            var filtroArquitetos = Builders<Usuario>.Filter.In("Id", listaDeFavoritos);


            List<Usuario> arquitetosEncontrados = _database.GetCollection<Usuario>("Usuario")
                .Find(filtroArquitetos).ToList();

            if (arquitetosEncontrados.Count != listaDeFavoritos.Count())
            {
                return NotFound();
            }

            var filtroUsuario = Builders<Usuario>.Filter.Eq("Id", idUsuario);

            var update = Builders<Usuario>.Update.Set("ListaDeFavoritos", listaDeFavoritos);

            _database.GetCollection<Usuario>("Usuario")
                .UpdateOne(filtroUsuario, update);

            return RedirectToAction("Index");
        }
    }
}

