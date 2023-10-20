using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Diagnostics;

namespace decorArqui.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        public IActionResult Login()
        {
            return View("~/Views/Home/Login.cshtml");
        }

        public IActionResult Cadastro()
        {
            return View("~/Views/Home/Cadastro.cshtml");
        }

        public IActionResult Arquiteto()
        {
            return View("~/Views/Arquiteto/Arquiteto.cshtml");
        }

        public IActionResult ArquitetoEditar()
        {
            return View("~/Views/Arquiteto/ArquitetoEditar.cshtml");
        }

        public IActionResult Cliente(Login model)
        {
            return View("~/Views/Cliente/Cliente.cshtml", model);
        }

        public IActionResult ClienteEditar(Login model)
        {
            return View("~/Views/Cliente/ClienteEditar.cshtml", model);
        }

        public IActionResult AvaliacaoArquiteto()
        {
            return View("~/Views/Cliente/AvaliacaoArquiteto.cshtml");
        }
        public IActionResult AvaliacaoCliente()
        {
            return View("~/Views/Arquiteto/AvaliacaoCliente.cshtml");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}