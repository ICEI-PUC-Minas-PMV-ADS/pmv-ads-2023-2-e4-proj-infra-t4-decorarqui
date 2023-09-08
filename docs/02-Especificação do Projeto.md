# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

## Personas

`Carlos Takahara Meirelles`  

Carlos é um profissional de arquitetura, *adora inovações e tecnologias, recentemente ele decidiu fazer uma reforma em sua casa, está buscando um arquiteto para fazer o projeto, mas não consegue orçamentos rápidos pelas redes sociais, o app decorArqui vai ajudar o Carlos com orçamentos rápidos e acesso ao portfólio de trabalho dos arquitetos que ele desejar um orçamento, além do chat em tempo real.* 

`Marina Gonçalves da Silva`  

Marina tem 34 anos e está se mudando para outra cidade por causa do seu emprego, ela pretende montar um projeto para uma nova casa com ideias sustentáveis e ecológicas para começar sua vida no novo local, por isso ela procura uma plataforma focada em projetos arquitetônicos e principalmente ideias ecológicas para o projeto. 

`Hamilton Andrade Ribeiro` 

Hamilton tem 43 anos e está se divorciando, ele pretende buscar um projeto de uma casa para começar uma nova vida, como ele adora passar o tempo em casa, busca um projeto planejado para isso e também para o seu conforto, o app decorArqui pode o ajudar com o projeto personalizado que ele sempre sonhou.  

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO...                 | QUERO/PRECISO ...                  |PARA ...                                |
|---------------------------|------------------------------------|----------------------------------------|
|Carlos Takahara Meirelles  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Marina Gonçalves da Silva  | Alterar permissões                 | Permitir que possam administrar contas |
|Hamilton Andrade Ribeiro   | Alterar permissões                 | Permitir que possam administrar contas |


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – Situação Atual

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Fluxo de processos BPMN - Fluxo de processos BPMN](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t4-decorarqui/assets/86004024/b9e54066-bce3-4762-b432-fe2472248572)

### Processo 2 – Proposta DecorArqui

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![DecorArqui Fluxo de processos BPMN - Fluxo de processos BPMN](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t4-decorarqui/assets/86004024/7b6becfd-67eb-46b8-8c13-5eca8ffe07ac)

## Indicadores de Desempenho


|INDICADOR                | OBJETIVO                  | DESCRIÇÃO                         | FONTE DE DADOS            | PERSPECTIVA               |
|-------------------------|---------------------------|-----------------------------------|---------------------------|---------------------------|
|Taxa de Retenção dos Usuários  |                     |                                   |                           |                           |
|Satisfação do Cliente  |                    |                      |                           |                           |                        |
|Eficiência na Comunicação e Orçamento   |                         |                          |                            |                           |
|                         |                         |                          |                            |                           |
|                         |                         |                          |                            |                           |
|                         |                         |                          |                            |                           |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.
- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|-------|-------------------------|-------|
|RF-01| Permitir que os arquitetos cadastrem seus perfis, incluindo histórico acadêmico, portfólio de projetos e informações profissionais| ALTA | 
|RF-02| Possibilitar o cadastro de clientes, com a inclusão de um resumo do pedido e uma estimativa de preço para seus projetos | ALTA |
|RF-03| Implementar uma funcionalidade que permita que profissionais e clientes iniciem conversas diretas no WhatsApp | ALTA |
|RF-04| Permitir que os arquitetos enviem orçamentos e propostas detalhadas em resposta aos projetos dos clientes | ALTA |
|RF-05| Desenvolver um sistema de pesquisa que permita aos usuários filtrar por região e tipo de profissional, simplificando a busca por arquitetos  | MÉDIA |
|RF-06| Habilitar clientes a avaliarem os arquitetos, contribuindo para a reputação e qualidade do serviço prestado  | BAIXA |
|RF-07| Permitir que arquitetos avaliem os clientes, promovendo avaliações recíprocas que ajudam na escolha de projetos | MÉDIA |
|RF-08| Dar aos clientes a capacidade de visualizar informações e projetos passados dos arquitetos, oferecendo insights sobre suas habilidades   | MÉDIA |
|RF-09| Oferecer aos clientes a opção de salvar arquitetos como favoritos, tornando mais fácil o acesso rápido aos profissionais preferidos   | BAIXA |
|RF-10| Possibilitar o cadastro de lojas de itens de decoração, permitindo que elas incluam informações sobre produtos, localização e opções de patrocínio   | ALTA |
|RF-11| Implementar diferentes planos de patrocínio para as lojas, garantindo que elas possam aparecer como referência na pesquisa de móveis e outros itens de decoração   | MÉDIA |
|RF-12| Permitir que os usuários visualizem os produtos das lojas patrocinadoras diretamente na plataforma das lojas   | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-----------------------|-------|
|RNF-01| O sistema deve ser responsivo para rodar em um dispositivos móvel | ALTA | 
|RNF-02| Deve processar requisições do usuário em no máximo 3s | BAIXA |
|RNF-03| O sistema deve ser acessado pelos sistemas operacionais Windows e IOS | MÉDIA |  
|RNF-04| Garantir que a aplicação seja compatível com uma variedade de navegadores web (Chrome, Edge, Mozila e Firefox) | ALTA |
|RNF-05| Garantir que a aplicação possa integrar-se facilmente com outros sistemas ou serviços, como serviços de pagamento online ou sistemas de mapeamento | MÉDIA | 
|RNF-06| Criar uma interface de usuário intuitiva e de fácil navegação para garantir que os usuários possam utilizar a aplicação com facilidade, independentemente de sua experiência técnica | BAIXA |
|RNF-07| Garantir que os dados dos usuários, como informações de perfil e histórico de projetos, sejam protegidos com medidas de segurança robustas, como criptografia de dados | ALTA |
|RNF-08| Projetar a aplicação de forma modular e com código bem documentado para facilitar a manutenção e atualizações futuras | MÉDIA |
|RNF-09| Realizar testes de qualidade para identificar e corrigir problemas antes do lançamento, garantindo uma experiência de usuário livre de erros | BAIXA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| A capacidade de hospedagem e escalabilidade do servidor deve suportar uma popularização acelerada|
|03| Mudanças rápidas na tecnologia podem requerer atualizações constantes do aplicativo  |
|04| A necessidade de cumprir regulamentos de privacidade de dados e outras leis de proteção ao consumidor pode afetar o design e a funcionalidade do aplicativo |


## Diagrama de Casos de Uso

O diagrama de casos de uso utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 



# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema.

![Matriz de Rastreabilidade](https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t4-decorarqui/main/docs/img/matriz_rastreabilidade_decoraqui.jpeg)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
