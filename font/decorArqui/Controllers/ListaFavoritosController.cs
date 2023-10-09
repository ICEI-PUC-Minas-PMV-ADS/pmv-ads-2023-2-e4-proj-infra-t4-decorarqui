using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace decorArqui.Controllers
{
    public class ListaFavoritosController : Controller
    {
        private readonly IMongoDatabase _database;
        public ListaFavoritosController(IMongoDatabase database)
        {
            _database = database;
        }


        public IActionResult Get(string idUsuario)
        {
            if (string.IsNullOrEmpty(idUsuario))
            {
                return NotFound();
            }

            var favoritoDoUsuario = database.GetFavoriteListByUserId(idUsuario);

            if (favoritoDoUsuario == null)
            {
                return NotFound();
            }

            return View(favoritoDoUsuario);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(FavoriteList favoritoDoUsuario, string idUsuario)
        {
            if (ModelState.IsValid)
            {
                favoritoDoUsuario.UserId = idUsuario;
                _favoriteListRepository.CreateFavoriteList(favoritoDoUsuario);
                return RedirectToAction("Index");
            }
            return View(favoriteList);
        }

        [HttpPut]
        [ValidateAntiForgeryToken]
        public IActionResult Update(string idUsuario, string[] listOfFavorites)
        {
            if (string.IsNullOrEmpty(idUsuario) || listOfFavorites == null)
            {
                return NotFound();
            }

            var favoritoDoUsuario = database.GetFavoriteListById(idUsuario);

            if (favoritoDoUsuario == null)
            {
                return NotFound();
            }

            favoritoDoUsuario.ListOfFavorites = listOfFavorites.ToList();

            database.UpdateFavoriteList(favoritoDoUsuario);

            return RedirectToAction("Index");
        }
    }
}

