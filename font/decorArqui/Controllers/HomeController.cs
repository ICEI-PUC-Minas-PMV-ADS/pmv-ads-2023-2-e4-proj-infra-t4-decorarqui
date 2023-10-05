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
            return View("~/Views/Home/Arquiteto.cshtml");
        }

        public IActionResult ArquitetoEditar()
        {
            return View("~/Views/Home/ArquitetoEditar.cshtml");
        }

        public IActionResult Cliente()
        {
            return View("~/Views/Home/Cliente.cshtml");
        }

        public IActionResult ClienteEditar()
        {
            return View("~/Views/Home/ClienteEditar.cshtml");
        }

        public IActionResult AvaliacaoArquiteto()
        {
            return View("~/Views/Home/AvaliacaoArquiteto.cshtml");
        }
        public IActionResult AvaliacaoCliente()
        {
            return View("~/Views/Home/AvaliacaoCliente.cshtml");
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