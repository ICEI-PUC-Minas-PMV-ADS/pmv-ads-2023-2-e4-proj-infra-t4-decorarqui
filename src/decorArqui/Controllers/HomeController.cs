using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Diagnostics;
using MongoDB.Driver;
using System.Web.Helpers;
using decorArqui.Services;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace decorArqui.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IMongoDatabase _database;
        private readonly ArquitetoServices _arquitetoServices;
        
        public HomeController(IMongoDatabase database, ArquitetoServices arquitetoServices, ILogger<HomeController> logger)
        {
            _logger = logger;
            _database = database;
            _arquitetoServices = arquitetoServices;
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
        
        public async Task<ActionResult>  Arquiteto(string id)
        {
            ArquitetoViewModel arquitetoViewModel = await _arquitetoServices.GetArquitetoAsync(id);
            return View("~/Views/Arquiteto/Arquiteto.cshtml", arquitetoViewModel);
        }

        public IActionResult ArquitetoEditar()
        {
            return View("~/Views/Arquiteto/ArquitetoEditar.cshtml");
        }
        
        public async Task<ActionResult> OrcamentosHome(string id)
        {
            var arquitetoViewModel = await _arquitetoServices.GetArquitetoAsync(id);
            return View("~/Views/Arquiteto/OrcamentosHome.cshtml", arquitetoViewModel);
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
        public IActionResult Projetos()
        {
            return View("~/Views/Projeto/projetoshome.cshtml");
        }
        public IActionResult EditarProjetos(string Id, string Nome, string Email, string Endereco, string Descricao, string Preco)
        {
            // Faça o processamento necessário aqui
            // Passe os valores para a visualização editproject.cshtml
            ViewData["Id"] = Id;
            ViewData["Nome"] = Nome;
            ViewData["Email"] = Email;
            ViewData["Endereco"] = Endereco;
            ViewData["Descricao"] = Descricao;
            ViewData["Preco"] = Preco;

            Console.WriteLine($"Id: {Id}, Nome: {Nome}, Email: {Email}, Endereco: {Endereco}, Descricao: {Descricao}, Preco: {Preco}");

            return View("~/Views/Projeto/editproject.cshtml");
        }
        public IActionResult NovoProjetos()
        {
            return View("~/Views/Projeto/insertproject.cshtml");
        }

        public async Task<ActionResult>  ArquitetoOrcamento(string id)
        {
            ArquitetoViewModel arquitetoViewModel = await _arquitetoServices.GetArquitetoAsync(id);
            var projetos = new List<string>();
            projetos = arquitetoViewModel.ProjetosSemOrcamento.Select(x => x.Descricao).ToList();
            ViewBag.ListaDeProjetos = new SelectList(projetos);
            return View("~/Views/Arquiteto/ArquitetoOrcamento.cshtml", arquitetoViewModel);
        }




        public async Task<ActionResult> PropostaCliente(string ArquitetoId)
        {
            var arquitetoViewModel = await _arquitetoServices.GetArquitetoAsync(ArquitetoId);

            ViewBag.Clientes = arquitetoViewModel.ProjetosSemOrcamento;
            ViewBag.Propostas = arquitetoViewModel.PropostasEmAberto;
            ViewBag.ArquitetoId = arquitetoViewModel.ArquitetoId;
            
            return View("~/Views/Proposta/Index.cshtml");
        }
        
        public async Task<ActionResult> PropostaClienteGerarProposta(string ArquitetoId, string ClientId)
        {
            var cliente =  await _database.GetCollection<Cliente>("Usuario")
                .Find(u => u.Id == ClientId).FirstOrDefaultAsync();
            
            var arquiteto =  await _database.GetCollection<Arquiteto>("Usuario")
                .Find(u => u.Id == ArquitetoId).FirstOrDefaultAsync();

            var projeto = new Projeto();
            var proposta = new Proposta();

            proposta.ArquitetoId = arquiteto.Id;
            projeto.ClienteId = cliente.Id;
            projeto.ClienteNome = cliente.Nome;
            ViewBag.Proposta = proposta;
            ViewBag.Projeto = projeto;

            return View("~/Views/Proposta/Criar.cshtml");
        }
        
        public async Task<ActionResult> PropostaClienteSalvarProposta(string ArquitetoId, string ClientId, string Descricao, double Orcamento)
        {
            
            var cliente =  await _database.GetCollection<Cliente>("Usuario")
                .Find(u => u.Id == ClientId).FirstOrDefaultAsync();
            
            var arquiteto =  await _database.GetCollection<Arquiteto>("Usuario")
                .Find(u => u.Id == ArquitetoId).FirstOrDefaultAsync();
            
                var novaProposta = new Proposta
                {
                    ClienteId = cliente.Id,
                    Cliente = cliente,
                    Descricao = Descricao,
                    Orcamento = Orcamento,
                    AceiteProposta = false
                };

                _database.GetCollection<Proposta>("Proposta").InsertOne(novaProposta);
                
                return RedirectToAction("PropostaCliente", new { ArquitetoId = arquiteto.Id });
        }
        
        public async Task<ActionResult> PropostaClienteDeletarProposta(string PropostaId, string ArquitetoId)
        {

            _database.GetCollection<Proposta>("Proposta").DeleteOneAsync(x=> x.Id == PropostaId);

            return RedirectToAction("PropostaCliente", new { ArquitetoId = ArquitetoId });
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