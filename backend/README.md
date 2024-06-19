# Back-End

Este é o back-end do projeto. É uma API RESTful que serve o front-end com dados.

## Ferramentas necessárias

### PostgreSQL

Você precisa ter o PostgreSQL instalado em sua máquina. Você pode baixá-lo [aqui](https://www.postgresql.org/download/).

Caso queria você pode utilizar um container Docker para rodar o PostgreSQL. Para isso, execute o seguinte comando:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Lembresse de criar um banco de dados com o nome `database` ou qualquer outro que você deseja apenas domando cuidado para que as conecxões sejam definidamente atualizadas.

### Node.js

Você precisa ter o Node.js instalado em sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

Sinta-se à vontade para usar um versionador de Node.js, como o nvim ou asdf.

### Yarn

Você precisa ter o Yarn instalado em sua máquina. Você pode instalá-lo executando o seguinte comando:

```bash
npm install -g yarn
```

## Primeiros passos

Instale as dependências do projeto executando o seguinte comando:

```bash
yarn install
```

## Configurando as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

- `<DATABASE_URL>`: URL de conexão com o banco de dados PostgreSQL. Exemplo: `postgres://user:password@localhost:5432/database`, caso você configure um usuário e/ou uma senha que contenha caracteres especiais, você deve codificar esses caracteres. Exemplo: `postgres://user:senha%40123@localhost:5432/database`.

- `<SECRET>`: Chave secreta para a geração de tokens JWT.

- `[APP_PORT]`: Porta em que o servidor será executado.

Váriaveis dentro de colchetes são opcionais.

## Executando as migrations

Para executar as migrations, execute o seguinte comando:

```bash
yarn typeorm migration:run
```

## Executando o projeto

Para executar o projeto, execute o seguinte comando:

```bash
yarn dev
```
