# Backlog

Esse é o backlog do projeto. Aqui estão listadas todas as funcionalidades e correções que serão poderão adicionadas no projeto.

## Débito Tecnico - Layout Amigável - M

<details close>

<summary>Detalhes</summary>

### Descrição

Adicionar um layout amigável para o sistema. Hoje os frontend foram entregues para atender a necessidade mais rápido do cliente, mas o layout não está amigável.

</details>

## <span style='color: red'>*</span> User Story - Sistema de distribuição de atendimento - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero distribuir o atendimento para que todos os atendentes tenham a mesma quantidade de atendimentos.

### Critérios de Aceitação

- O sistema deve distribuir os atendimentos de forma equitativa entre os atendentes.

### Cenários de teste

**Cenário** - Distribuição de atendimentos para 3 atendentes e 11 atendimentos
<br>
**Dado** que existem 2 atendentes e 10 atendimentos
<br>
**Quando** o sistema distribuir os atendimentos
<br>
**Então** cada atendente terá 5 atendimentos

**Cenário** - Distribuição de atendimentos para 2 atendentes e 10 atendimentos
<br>
**Dado** que existem 3 atendentes e 10 atendimentos
<br>
**Quando** o sistema distribuir os atendimentos
<br>
**Então** cada atendente terá 3 atendimentos e 1 atendente terá 4 atendimentos

</details>

## User Story - Entrega de mensagens em tempo real como Consumidor - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero receber as mensagens em tempo real para que eu possa me comunicar com o atendente de forma mais rápida.

### Critérios de Aceitação

- O sistema deve entregar as mensagens em tempo real para o consumidor.

### Cenários de teste

**Cenário** - Recebimento de mensagens em tempo real
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o atendente enviar uma mensagem
<br>
**Então** o consumidor deve receber a mensagem em tempo real

</details>

## User Story - Entrega de mensagens e conversas em tempo real como Atendente - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero receber as conversas/mensagens em tempo real para que eu possa me comunicar com o consumidor de forma mais rápida.

### Critérios de Aceitação

- O sistema deve entregar as mensagens em tempo real para o atendente.

- O sistema deve entregas as conversas em tempo real para o atendente.

### Cenários de teste

**Cenário** - Recebimento de mensagens em tempo real
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**E** o atendentente está com foco em uma conversa
<br>
**Quando** o consumidor enviar uma mensagem
<br>
**Então** o atendente deve receber a mensagem em tempo real

**Cenário** - Recebimento de conversas em tempo real
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**Quando** o consumidor iniciar uma conversa
<br>
**Então** o atendente deve receber a conversa em tempo real

</details>

## User Story - Sistema de disponibilidade do atendente - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero poder definir minha disponibilidade para que eu possa atender os consumidores quando estiver disponível.

### Critérios de Aceitação

- Quando o atendete logar no sistema ele deve estar disponível.

- O sistema deve permitir que o atendente defina sua disponibilidade.

- O sistema deve permitir que o atendente defina sua indisponibilidade.

### Cenários de teste

**Cenário** - Definição de disponibilidade
<br>
**Dado** que o atendente está indisponível
<br>
**Quando** o atendente definir sua disponibilidade
<br>
**Então** o atendente deve ficar disponível
**E** deve receber novas conversas

**Cenário** - Definição de indisponibilidade
<br>
**Dado** que o atendente está disponível
<br>
**Quando** o atendente definir sua indisponibilidade
<br>
**Então** o atendente deve ficar indisponível
**E** não deve receber novas conversas

**Cenário** - Definição de disponibilidade ao logar
<br>
**Dado** que o atendente não está logado
<br>
**Quando** o atendente logar
<br>
**Então** o atendente deve ficar disponível

</details>

## User Story - Dark mode na aplicação do consumidor - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero poder ativar o dark mode para que eu possa ter uma melhor experiência de uso.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor ative o dark mode.

### Cenários de teste

**Cenário** - Ativação do dark mode
<br>
**Dado** que o consumidor está utilizando o sistema
<br>
**Quando** o consumidor ativar o dark mode
<br>
**Então** o sistema deve mudar para o dark mode

</details>

## User Story - Dark mode na aplicação do atendente - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero poder ativar o dark mode para que eu possa ter uma melhor experiência de uso.

### Critérios de Aceitação

- O sistema deve permitir que o atendente ative o dark mode.

### Cenários de teste

**Cenário** - Ativação do dark mode

**Dado** que o atendente está utilizando o sistema

**Quando** o atendente ativar o dark mode

**Então** o sistema deve mudar para o dark mode

</details>

## Débito Tecnico - Validações das requisições de API - M

<details close>

<summary>Detalhes</summary>

### Descrição

Adicionar validações nas requisições de API para garantir que os dados enviados estão corretos.

</details>

## Bug - Atualização de usuários não está funcionando

<details close>

<summary>Detalhes</summary>

### Descrição

A atualização de usuários não está funcionando. Estamos tomando erro na api.


</details>

## User Story - Gerador de GIFs e Memes - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero poder enviar GIFs e Memes para que eu possa me comunicar de forma mais divertida.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor envie GIFs e Memes.

### Cenários de teste

**Cenário** - Envio de GIFs e Memes
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor enviar um GIF ou Meme
<br>
**Então** o atendente deve receber o GIF ou Meme

</details>

## User Story - Pequisa de satisfação - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero poder avaliar o atendimento para que eu possa dar um feedback.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor avalie o atendimento.

### Cenários de teste

**Cenário** - Avaliação do atendimento
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor/usuário finalizar a conversa
<br>
**Então** o consumidor deve avaliar o atendimento

</details>

## User Story - Histórico de conversas - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero poder ver o histórico de conversas para que eu possa ver o que foi conversado anteriormente.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor veja o histórico de conversas.

### Cenários de teste

**Cenário** - Visualização do histórico de conversas
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor acessar o histórico de conversas
<br>
**Então** o consumidor deve ver o histórico de conversas

</details>

## User Story - Jogos de passa tempo - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor quero poder jogar jogos de passa tempo para que eu possa me distrair enquanto espero o atendente.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor jogue jogos de passa tempo.

### Cenários de teste

**Cenário** - Jogar jogos de passa tempo
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor acessar os jogos de passa tempo
<br>
**Então** o consumidor deve poder jogar os jogos de passa tempo

</details>

## User Story - Indicador de mensagens sendo digitadas - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor/atendente quero ver um indicador de mensagens sendo digitadas para que eu saiba que o atendente/consumidor está respondendo.

### Critérios de Aceitação

- O sistema deve mostrar um indicador de mensagens sendo digitadas no portal do usuário.
- O sistema deve mostrar um indicador de mensagens sendo digitadas no portal do atendente.

### Cenários de teste

**Cenário** - Indicador de mensagens sendo digitadas para o atendente
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**E** o atendente está com foco em uma conversa
<br>
**Quando** o consumidor estiver digitando uma mensagem
<br>
**Então** o atendente deve ver um indicador de mensagens sendo digitadas

**Cenário** - Indicador de mensagens sendo digitadas para o consumidor
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o atendente estiver digitando uma mensagem
<br>
**Então** o consumidor deve ver um indicador de mensagens sendo digitadas

</details>

## User Story - Marcação de Leitura - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero ver uma marcação de leitura para que eu saiba que a mensagem foi lida.

### Critérios de Aceitação

- O sistema deve mostrar uma marcação de leitura no portal do atendente.

### Cenários de teste

**Cenário** - Marcação de leitura
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**E** o atendente está com foco em uma conversa
<br>
**Quando** o consumidor ler uma mensagem
<br>
**Então** o atendente deve ver uma marcação de leitura

</details>

## User Story - Envio de arquivos - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor/atendente quero poder enviar arquivos para que eu possa compartilhar informações com o atendente/consumidor.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor envie arquivos.
- O sistema deve permitir que o atendente envie arquivos.

### Cenários de teste

**Cenário** - Envio de arquivos para o atendente
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor enviar um arquivo
<br>
**Então** o atendente deve receber o arquivo

**Cenário** - Envio de arquivos para o consumidor
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**Quando** o atendente enviar um arquivo
<br>
**Então** o consumidor deve receber o arquivo

</details>

## User Story - Envio de mensagens de voz - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor/atendente quero poder enviar mensagens de voz para que eu possa me comunicar de forma mais rápida.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor envie mensagens de voz.
- O sistema deve permitir que o atendente envie mensagens de voz.

### Cenários de teste

**Cenário** - Envio de mensagens de voz para o atendente
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor enviar uma mensagem de voz
<br>
**Então** o atendente deve receber a mensagem de voz

**Cenário** - Envio de mensagens de voz para o consumidor
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**Quando** o atendente enviar uma mensagem de voz
<br>
**Então** o consumidor deve receber a mensagem de voz

</details>

## User Story - Envio de mensagens de vídeo - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como consumidor/atendente quero poder enviar mensagens de vídeo para que eu possa me comunicar de forma mais rápida.

### Critérios de Aceitação

- O sistema deve permitir que o consumidor envie mensagens de vídeo.
- O sistema deve permitir que o atendente envie mensagens de vídeo.

### Cenários de teste

**Cenário** - Envio de mensagens de vídeo para o atendente
<br>
**Dado** que o consumidor está conectado ao sistema
<br>
**Quando** o consumidor enviar uma mensagem de vídeo
<br>
**Então** o atendente deve receber a mensagem de vídeo

**Cenário** - Envio de mensagens de vídeo para o consumidor
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**Quando** o atendente enviar uma mensagem de vídeo
<br>
**Então** o consumidor deve receber a mensagem de vídeo

</details>

## User Story - Última mensagem enviada - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero ver a última mensagem enviada para que eu saiba o que foi conversado anteriormente.

### Critérios de Aceitação

- O sistema deve mostrar a última mensagem enviada no portal do atendente.

### Cenários de teste

**Cenário** - Última mensagem enviada
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**E** o atendente está com foco em outra conversa
<br>
**Quando** o consumidor enviar uma mensagem
<br>
**Então** o atendente deve ver a última mensagem enviada

</details>

## User Story - Persistencia na sessão do atendente - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero que o sistema persista minha sessão para que eu não precise logar toda vez que abrir o sistema.

### Critérios de Aceitação

- O sistema deve persistir a sessão do atendente.

### Cenários de teste

**Cenário** - Persistencia na sessão do atendente
<br>
**Dado** que o atendente está logado no sistema
<br>
**Quando** o atendente fechar o sistema
<br>
**E** abrir o sistema novamente
<br>
**Então** o atendente deve estar logado

</details>

## Bug - Não está sendo carregado mais que 25 resultados na api

<details close>

<summary>Detalhes</summary>

### Descrição

A api está limitando a quantidade de resultados para 25. Precisamos ter visibilidade de todos os dados. As áreas são as conversas e também as mensagens das conversas.

</details>

## Bug - Consumidor com erro na aplicação

<details close>

<summary>Detalhes</summary>

### Descrição

Eventualmente o consumidor sofre com vários erros de conexão e não consegue mais se conectar. Precisamos investigar o que está acontecendo.

</details>

## User Story - Criação de outros usuários - M

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como administrador quero poder criar outros usuários para que eu possa ter mais atendentes.

### Critérios de Aceitação

- O sistema deve permitir que o administrador crie outros usuários.

### Cenários de teste

**Cenário** - Criação de outros usuários
<br>
**Dado** que o administrador está conectado ao sistema
<br>
**Quando** o administrador criar um novo usuário
<br>
**Então** o novo usuário deve ser criado

</details>

## <span style='color: red'>*</span> User Story - O Atendente ver apenas conversas atribuidas a ele - P

<details close>

<summary>Detalhes</summary>

### Hístoria de Usuário

Eu como atendente quero ver apenas as conversas atribuidas a mim para que eu possa focar no atendimento.

### Critérios de Aceitação

- O sistema deve mostrar apenas as conversas atribuidas ao atendente.

### Cenários de teste

**Cenário** - Visualização de conversas atribuidas ao atendente
<br>
**Dado** que o atendente está conectado ao sistema
<br>
**Quando** o atendente acessar as conversas
<br>
**Então** o atendente deve ver apenas as conversas atribuidas a ele

</details>