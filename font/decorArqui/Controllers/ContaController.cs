using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace decorArqui.Controllers
{
    public class ContaController : Controller
    {
        private IMongoDatabase _database;
        public ContaController(IMongoDatabase database)
        {
            _database = database;
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> LoginAsync(Login model)
        {
            if (ModelState.IsValid)
            {
                var user = await _database.GetCollection<Usuario>("Usuario")
                    .Find(u => u.Email == model.Email && u.Senha == model.Senha && u.Tipo == model.Tipo)
                    .FirstOrDefaultAsync();
                if (user != null)
                {
                    if (user.Tipo == "arquiteto")
                    {
                        return RedirectToAction("Arquiteto", "Home");
                    }
                    else if (user.Tipo == "cliente")
                    {
                        return RedirectToAction("Cliente", "Home");
                    }
                    
                }
                else
                {
                    // Login Falhou
                    ModelState.AddModelError("", "Email ou senha inválidos");
                    // Exibir mensagem de erro na view
                    ViewBag.ErrorMessage = "Email ou senha inválidos";
                }

            }
            return View("~/Views/Home/Login.cshtml", model);
        }
        public ActionResult Register(Register model)
        {
            if (ModelState.IsValid)
            {
                var Usuario = new Usuario
                {
                    Nome = model.Nome,
                    Email = model.Email,
                    Senha = model.Senha,
                    Tipo = model.Tipo
                };
                _database.GetCollection<Usuario>("Usuario").InsertOne(Usuario);

                //Registro bem-sucedido
                return View("~/Views/Home/Login.cshtml");
            }
            return View(model);
        }

    }
}
