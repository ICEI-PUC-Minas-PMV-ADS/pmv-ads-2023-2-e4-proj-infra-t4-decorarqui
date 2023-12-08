

export const normalizarTexto = (text) => {
    return String(text)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

export const formOption = {
    local: ["Casa", "Apartamento", "Comércio / Escritório", "Outros"],
    conhecimento: [
      "Tenho ideias do projeto",
      "Quero assessoria total do profissional",
      "Não tenho certeza",
    ],
    comodo: [
      "Quarto",
      "Sala",
      "Cozinha",
      "Banheiro",
      "Varanda / Externo",
      "Outros",
    ],
    tempo: [
      "Urgente (o quanto antes possível)",
      "Nos próximos 7 dias",
      "Nos próximos 15 dias",
      "Nos próximos 30 dias",
      "Mais de 1 mês",
      "Não tenho data definida",
    ],
    gasto: [
      "Menos de R$1.000,00",
      "Entre  R$1.000,00 e  R$10.000,00",
      "Entre  R$10.000,00 e  R$30.000,00",
      "Entre  R$30.000,00 e  R$50.000,00",
      "Acima de R$50.000,00",
    ],
  };

export const architectSeeds = [
    {
      Id: 10,
      Imagem: null,
      Nome: "Paulo Polashka",
      Cidade: "São Paulo",
      Estado: "SP",
      Profissao: "Arquiteto",
      Avaliacao: 4,
    },
    {
      Id: 11,
      Imagem: null,
      Nome: "Douglas França",
      Cidade: "São Paulo",
      Estado: "SP",
      Profissao: "Engenheiro Civil",
      Avaliacao: 5,
    },
    {
      Id: 12,
      Imagem: null,
      Nome: "Rafael Rezende",
      Cidade: "São Paulo",
      Estado: "SP",
      Profissao: "Designer de Interiores",
      Avaliacao: 3,
    },
    {
      Id: 13,
      Imagem: null,
      Nome: "Sarah Ariart",
      Cidade: "São Paulo",
      Estado: "SP",
      Profissao: "Designer de Interiores",
      Avaliacao: 2.5,
    },
  ]