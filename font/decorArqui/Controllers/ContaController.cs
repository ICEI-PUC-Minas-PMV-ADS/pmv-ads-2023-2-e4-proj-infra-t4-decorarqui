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
            //if (ModelState.IsValid)
            //{
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
                        return  await DadosDaConta(model);
                    }
                    
                }
                else
                {
                    // Login Falhou
                    ModelState.AddModelError("", "Email ou senha inválidos");
                    // Exibir mensagem de erro na view
                    ViewBag.ErrorMessage = "Email ou senha inválidos";
                }

            //}
            return View("~/Views/Home/Login.cshtml", model);
        }

        public async Task<ActionResult> DadosDaConta(Login model)
        {
            // Recupere os dados da conta do MongoDB (substitua pelo seu código real)
            Usuario dadosDaConta = await _database.GetCollection<Usuario>("Usuario")
                    .Find(u => u.Email == model.Email && u.Senha == model.Senha && u.Tipo == model.Tipo)
                    .FirstOrDefaultAsync();

            if (dadosDaConta == null)
            {
                // Lida com o caso em que os dados da conta não foram encontrados
                return NotFound();
            }
            else
            {
                ViewBag.Nome = dadosDaConta.Nome;
                ViewBag.Email = dadosDaConta.Email;
            }                          

            // Envie os dados para a visualização
            return View("~/Views/Home/Cliente.cshtml", dadosDaConta);
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
