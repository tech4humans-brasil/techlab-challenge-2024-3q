# Tech Lab Challenge 2024 3q

Esse projeto é uma aplicação de chat para consumidores e atendentes, com interfaces próprias para cada um. Porém, as aplicações ainda têm alguns bugs, problemas de desempenho, falhas de segurança e funcionalidades que não foram implementadas.

O seu desafio é resolver esses problemas e adicionar as funcionalidades que estão faltando para que o sistema funcione de forma correta.

Vocês têm a liberdade de começar por onde se sentirem confortável, implementando da forma que acharem melhor. Também pode realizar as edições que achar necessário para que o desenvolvimento alcance o objetivo desejado.

Refatorações completas são aceitas, inclusive de linguagens de programação, desde que o objetivo seja alcançado.

## Começando

Para começar, você precisa fazer um fork desse repositório e cloná-lo para a sua máquina.

O projeto foi testado utilizando a verão 20 e 22 do Node.js, então é recomendado que você utilize uma dessas versões.

O projeto está utilizando yarn v4, então é bom ter a documentação em mãos para eventuais dúvidas, poucas coisas mudam, mas é sempre por se atualizar.

## Objetivo

O objetivo é corrigir os problemas existentes e adicionar as funcionalidades que estão faltando para que o sistema funcione de forma correta. Você pode acompanhar a lista [BACKLOG AQUI](./BACKLOG.md)

Deverá ser entregue pelo menos **seis features** e **duas correções de bugs**. Sendo que duas features estão listadas como obrigatórias no backlog. Você consegue identificar quais são pelo simbolo de <span style='color: red'>*</span> ao lado do nome.

Temos 4 bugs escondidos na aplicação que não estão listados no backlog, sendo que 2 deles são vulnerabilidades críticas de segurança, então fique atento.

Muitos dos itens do backlog são interdependentes, então é importante que vocês tenham uma visão geral do que está sendo feito.

Como vocês podem ver, o backlog é extenso de proposito, para que vocês possam escolher o que querem fazer, e o que acham que é mais importante. Alguns features listadas ali não agregam valor ao produto, justamente para entendermos o senso de priorização de vocês.

## Critérios de avaliação

- **Funcionalidade**: O sistema deve funcionar corretamente e atender aos requisitos propostos.
- **Entregas**: Deverá ser entregue pelo menos **seis features (user story, história de usuário)** e **duas correções de bugs**. Sendo que duas features estão listadas como obrigatórias no backlog. Você consegue identificar quais são pelo simbolo de <span style='color: red'>*</span> ao lado do nome. Mas sinta-se a vontade para implementar mais features e correções de bugs.
- **Qualidade do código**: Quanto mais qualidade, melhor!
- **Senso de prioridade**: A priorização das features é um ponto importante, então escolha bem o que você vai fazer.
- **Commits**: Commits bem feitos e organizados são um ponto positivo.
- **Refatoração** - **Opcional**: A refatoração do código é bem-vinda, o código se encontra sem qualidade, então uma refatoração cairia bem.
- **Reescrita** - **Opcional**: A reescrita do código é bem-vinda, sinta-se a vontade para reescrever a aplicação da maneira que bem entender em qualquer linguagem comercialmente estável no mercado, exemplo: Java, Ruby, Python, JavaScript, etc. Porém tome muito cuidado com a linguagem escolhida, caso ela seja muito diferente do que foi proposto, isso pode ser um ponto negativo na avaliação. Alguns pontos de atenção são a alteração dos arquivos Docker da aplicação, e a alteração do arquivo `README.md` para que a aplicação possa ser executada. Caso não se sinta 100% confiante com essa abordagem, não faça.
- **Funcionalidades extras** - **Opcional**: Funcionalidades extras são bem-vindas, mas não são obrigatórias. Caso você tenha tempo e queira adicionar algo a mais, sinta-se à vontade, mas não esqueça de sinalizar isso de alguma forma, por exemplo, no `README.md`. Caso ache necessário, você pode gravar um vídeo explicando as funcionalidades extras e enviar para [force@tech4h.com.br](mailto:force@tech4h.com.br), não se esqueça de se identificar corretamente.

## Dicas

- Leia a documentação dos frameworks e bibliotecas utilizadas.
- Testes unitários podem agregar um valor imenso as features entregues.
- Utilize o Docker para subir o ambiente de desenvolvimento.
- Alguns bugs acontecem rapidamente na aplicação, então recomendamos que você reconstrua o ambiente para a investigação dos problemas (ou pelo menos limpe as tabelas).
- O Backend está utilizando o TypeORM, então você pode utilizar o TypeORM CLI para criar migrations e rodar as migrations. Leia a documentação do TypeORM para mais informações.
- O Frontend está utilizando o Vite, então você pode utilizar o Vite CLI para rodar o projeto. Leia a documentação do Vite para mais informações.
- Algumas features do backlog vão quebrar o backend, então fique atento a isso.
- Muitas features dependem de outras, conhecidas como o famoso `block by`. Isso não está explicito no backlog, então fique atento.
- Backlog é extenso, e nem todas solicitadas fazem sentido, **NÃO É OBRIGATÓRIO** fazer todas, escolha bem o que você vai fazer.

## Datas

Os desenvolvimentos devem ser enviados para análise até o dia 07/07 às 23:59.

As mentorias ocorrerão entre os dias 25/06 e 05/07, das 08h às 19h. Elas devem ser agendadas com pelo menos 4 hora de antecedência.

É necessário realizar pelo menos uma mentorias de até 15 minutos cada. A participação nas mentorias é obrigatória tanto para o recebimento do prêmio quanto para a candidatura à vaga de estágio.

## Mentorias

As mentorias podem ser agendados pelos links do calendar. Cada um dos mentores tem a sua própria agenda.

A participação nas mentorias é obrigatória tanto para o recebimento do prêmio quanto para a candidatura à vaga de estágio, ela terá a duração de 15 minutos, então uma dica, venha com perguntas prontas.

Caso nenhum dos horários se encaixe com a sua disponibilidade, envie um e-mail para [force@tech4h.com.br](mailto:force@tech4h.com.br) e tentaremos encontrar um horário que funcione para todos.

- Tony: https://calendar.app.google/YH1BTog3uUZKidjw8
- Gustey: https://calendar.app.google/gDF7Vc62fTQdvm2W7
- Fabio: https://calendar.app.google/huvq2ytbv8bkNZ92A

## Como entregar o meu projeto?

Para entregar o seu projeto, você deve enviar um e-mail para [force@tech4h.com.br](mailto:force@tech4h.com.br) com o link do seu repositório e o seu nome, caso você entregue com um email diferente da inscrição é necessário a sinalização no e-mail.

## Links úteis

### Documentações

- https://docs.docker.com/
- https://nodejs.org/en/docs/
- https://reactjs.org/docs/getting-started.html
- https://vitejs.dev/guide/
- https://socket.io/docs/v4/index.html
- https://expressjs.com/pt-br/
- https://typeorm.io/#/
- https://yarnpkg.com/getting-started/usage
- https://docs.docker.com/compose/

### Design pattern

- https://www.hostgator.com.br/blog/design-patterns-e-seus-beneficios
- https://www.slideshare.net/slideshow/boas-praticas-de-programacao-com-object-calisthenics/267739583#19
- https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530

### Boas práticas

- https://www.sensedia.com.br/post/api-boas-praticas-de-paginacao-e-filtros
- https://www.vaadata.com/blog/how-to-securely-store-passwords-in-database

### Outros

- https://asdf-vm.com/
- https://github.com/asdf-vm/asdf-nodejs
- https://github.com/nvm-sh/nvm
