using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace decorArqui.Controllers
{
    public class AvaliacaoController : Controller
    {
        private IMongoDatabase _database;
        public AvaliacaoController(IMongoDatabase database)
        {
            _database = database;
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]

        public ActionResult Register(Avaliacao model)
        {
            if (ModelState.IsValid)
            {
                var Avaliacao = new Avaliacao
                {
                    Nome = model.Nome,
                    Nota = model.Nota,
                    Tipo = model.Tipo
                };
                _database.GetCollection<Avaliacao>("Avaliacao").InsertOne(Avaliacao);

                if (Avaliacao.Tipo == "cliente")
                {
                    return View("~/Views/Home/AvaliacaoCliente.cshtml");
                }
                else
                {
                    return View("~/Views/Home/AvaliacaoArquiteto.cshtml");
                }
                
                
            }
            return View(model);
        }
    }
}
