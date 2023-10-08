﻿using decorArqui.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Diagnostics;
using System.Text.Json;

namespace decorArqui.Controllers

{
    //[Route("api/[controller]")]
    //[ApiController]

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

        //public async Task<IActionResult> ClienteEditarAsync(Usuario model)
        //{
        //    Usuario dadosDaConta = await _database.GetCollection<Usuario>("Usuario")
        //            .Find(u => u.Email == model.Email && u.Senha == model.Senha && u.Tipo == model.Tipo)
        //            .FirstOrDefaultAsync();

        //    model.Nome = dadosDaConta.Nome;
        //    model.Email = dadosDaConta.Email;
        //    model.Tipo = dadosDaConta.Tipo;

        //    Console.WriteLine($"Nome: {model.Nome}, Email: {model.Email}, Preco: {model.Preco}, Descricao: {model.Descricao}");
        //    return View("~/Views/Home/ClienteEditar.cshtml", model);
        //}

        public async Task<IActionResult> ClienteEditarAsync(string Id)
        {
            Usuario model =  await _database.GetCollection<Usuario>("Usuario")
                    .Find(u => u.Id == Id)
                    .FirstOrDefaultAsync();

            return View("~/Views/Home/ClienteEditar.cshtml", model);
        }

        public IActionResult Arquiteto(Usuario model)
        {
            return View("~/Views/Home/Arquiteto.cshtml", model);
        }


        [HttpPost]
        public async Task<ActionResult> LoginAsync(Login model)
        {
            //if (ModelState.IsValid)
            //{
                Usuario user = await _database.GetCollection<Usuario>("Usuario")
                    .Find(u => u.Email == model.Email && u.Senha == model.Senha && u.Tipo == model.Tipo)
                    .FirstOrDefaultAsync();
                if (user != null)
                {
                    if (user.Tipo == "arquiteto")
                    {
                        model.Nome = user.Nome;
                        Console.WriteLine($"Nome: {model.Nome}, Email: {model.Email}");
                        return RedirectToAction("Arquiteto", "Conta", model);
                    }
                    else if (user.Tipo == "cliente")
                    {
                        model.Nome = user.Nome;
                        Console.WriteLine($"Nome: {model.Nome}, Email: {model.Email}");                       
                        return  await DadosDaConta(model);
                    }
                    else if (user.Tipo == "loja")
                {
                    model.Nome = user.Nome;
                    return RedirectToAction("Index", "Home", model);
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
                ViewBag.Descricao = dadosDaConta?.Descricao;
                ViewBag.Preco = dadosDaConta?.Preco;
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

        public async Task<ActionResult> Update(string Id, string Descricao, double Preco)
        {
            Usuario model = await _database.GetCollection<Usuario>("Usuario")
                .Find(u => u.Id == Id)
                .FirstOrDefaultAsync();

            // Recupere o usuário atual do banco de dados com base em algum critério exclusivo, como o email.
            var filtro = Builders<Usuario>.Filter.Eq(u => u.Id, model.Id); // Substitua pelo critério exclusivo apropriado.

                // Crie um objeto de atualização com os campos que deseja modificar (Descricao e Preco).
                var atualizacao = Builders<Usuario>.Update
                    .Set(u => u.Descricao, Descricao)
                    .Set(u => u.Preco, Preco);

                // Use o método UpdateOneAsync para aplicar a atualização no banco de dados.
                var resultado = await _database.GetCollection<Usuario>("Usuario")
                    .UpdateOneAsync(filtro, atualizacao);

            Usuario modelUpdated = await _database.GetCollection<Usuario>("Usuario")
                .Find(u => u.Id == Id)
                .FirstOrDefaultAsync();

            if (resultado.ModifiedCount > 0)
                {
                    // A atualização foi bem-sucedida.
                    return RedirectToAction("Cliente", "Home", modelUpdated); // Redireciona para a página de perfil ou outra ação apropriada.
                }
                else
                {
                // O usuário não foi encontrado ou nenhum campo foi modificado.
                ViewBag.ErrorMessage = "Nenhum campo foi modificado";
                }
            // Se o ModelState não for válido, você pode redirecionar de volta à página de edição com erros, se necessário.
            return View("~/Views/Home/ClienteEditar.cshtml", model);
        }

    }
}
