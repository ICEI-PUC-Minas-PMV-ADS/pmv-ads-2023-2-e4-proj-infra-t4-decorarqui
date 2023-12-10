using decorArqui.Services;
using decorArqui.Db;
using System.Text.Json;
using System.Net;
using decorArqui.RequestTypes;
using decorArqui.ResponseTypes;
using decorArqui.Enums;
using decorArqui.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ArquitetoService>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<ProjetoService>();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("Database"));

builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 422;
        context.Response.ContentType = "application/json";
        var errorResponse = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Unprocessable Content, the server understands the content type, but it was unable to process the contained instructions.",
            Error = new[] { ex.Message },
            Data = new List<dynamic>(),
        };

        var jsonError = JsonSerializer.Serialize(errorResponse);
        await context.Response.WriteAsync(jsonError);
    }
});

app.MapGet("/arquitetos", async (ArquitetoService service) =>
{
    return await service.GetAsync();
});

app.MapGet("/arquitetos/{id}", async (string id, ArquitetoService service) =>
{
    return await service.GetByUserAsync(id);
});

app.MapGet("/clientes", async (ClienteService service) =>
{
    return await service.GetAsync();
});

app.MapGet("/clientes/{id}", async (string id, ClienteService service) =>
{
    return await service.GetByUserAsync(id);
});

app.MapPost("/usuarios/Register", async (CreateUsuarioRequestType body, HttpContext context) =>
{
    var usuarioService = context.RequestServices.GetRequiredService<UsuarioService>();
    var arquitetoService = context.RequestServices.GetRequiredService<ArquitetoService>();
    var clienteService = context.RequestServices.GetRequiredService<ClienteService>();
    var responseType = new CreateUsuarioResponseType();

    var endereco = new Endereco(body.Cidade, body.Estado);
    var novoUsuario = new Usuario(body.Nome, body.Email, body.Senha, body.ImageUrl, body.Tipo);
    await usuarioService.RegisterAsync(novoUsuario);
    var usuario = await usuarioService.GetAsync(body.Nome, body.Senha);

    if (body.Tipo == TipoUsuario.Arquiteto)
    {
        var arquiteto = new Arquiteto(usuario.Id, body.Nome, endereco, body.Profissao, 0, 0);
        await arquitetoService.CreateAsync(arquiteto);

        responseType.Id = usuario.Id;
        responseType.Nome = usuario.Nome;
        responseType.Tipo = usuario.Tipo;
        responseType.Data = arquiteto;
        context.Response.StatusCode = 201;
    }

    if (body.Tipo == TipoUsuario.Cliente)
    {
        var cliente = new Cliente(usuario.Id, body.Nome, endereco);
        await clienteService.CreateAsync(cliente);

        responseType.Id = usuario.Id;
        responseType.Nome = usuario.Nome;
        responseType.Tipo = usuario.Tipo;
        responseType.Data = cliente;
        context.Response.StatusCode = 201;
    }

    await context.Response.WriteAsJsonAsync(responseType);
});


app.MapPost("/clientes/Login", async (LoginUsuarioRequestType body, HttpContext context) =>
{

    var usuarioService = context.RequestServices.GetRequiredService<UsuarioService>();
    var arquitetoService = context.RequestServices.GetRequiredService<ArquitetoService>();
    var clienteService = context.RequestServices.GetRequiredService<ClienteService>();
    var responseType = new LoginUsuarioResponseType();

    var usuario = await usuarioService.GetAsync(body.Usuario, body.Senha);

    if (usuario != null && usuario.Tipo == TipoUsuario.Arquiteto)
    {
        var arquiteto = await arquitetoService.GetByUserAsync(usuario.Id);
        responseType.Id = usuario.Id;
        responseType.Nome = usuario.Nome;
        responseType.Tipo = usuario.Tipo;
        responseType.Data = arquiteto;
        context.Response.StatusCode = 200;
    }

    if (usuario != null && usuario.Tipo == TipoUsuario.Cliente)
    {
        var cliente = await clienteService.GetByUserAsync(usuario.Id);
        responseType.Id = usuario.Id;
        responseType.Nome = usuario.Nome;
        responseType.Tipo = usuario.Tipo;
        responseType.Data = cliente;
        context.Response.StatusCode = 200;
    }

    if (usuario == null) context.Response.StatusCode = 404;

    await context.Response.WriteAsJsonAsync(responseType);
});


app.MapGet("/projetos", async (ProjetoService service) =>
{
    return await service.GetAsync();
});

app.MapGet("/projetos/{id}", async (string id, ProjetoService service) =>
{
    return await service.GetAsync(id);
});

app.MapGet("/projetos/clientes/{id}", async (string id, ProjetoService service) =>
{
    return await service.GetByClientAsync(id);
});

app.MapPost("/projetos", async (CreateProjetoRequestType body, HttpContext context) =>
{
    var projetoService = context.RequestServices.GetRequiredService<ProjetoService>();
    var novoProjeto = new Projeto(body.ClienteId, body.Local, body.Plano, body.Comodo, body.Prazo, body.Estimativa, body.Nome, body.Detalhes);
    await projetoService.CreateAsync(novoProjeto);
});

app.Run();