# Trybe Futebol Club ⚽

## 📄 Sobre:

Projeto desenvolvido durante o módulo de back-end do curso de desenvolvimento web da [Trybe](https://www.betrybe.com/).

O TFC é uma aplicação full stack para gerenciamento de pontos em um campeonato de futebol. Ele é composto por uma API REST e uma aplicação front-end confeccionada com React cujo as requisições para a API foram feitas através da biblioteca Axios.

O objetivo desse projeto foi desenvolver a API (utilizando o método TDD) e também integrar através do docker-compose as aplicações para que elas funcionem consumindo um banco de dados.


</br>
<details>
<summary><strong>Desempenho</strong></summary>
Aprovado com 100% de desempenho em todos os requisitos
 
![image](https://user-images.githubusercontent.com/99846604/231584348-a6e7c08d-89ea-4e59-87a7-02c894ac14e6.png)
 
</details>

<details>
<summary><strong>Requisitos</strong></summary>
</br>

1 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de users

2 - Desenvolva testes que cubram no mínimo 5 por cento dos arquivo backend em /src com um mínimo de 7 linhas cobertas

3 - Desenvolva o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend

4 - Desenvolva testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas

5 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar um email no frontend

6 - Desenvolva testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas

7 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar uma senha no frontend

8 - Desenvolva testes que cubram no mínimo 20 por cento dos arquivo backend em /src com um mínimo de 35 linhas cobertas

9 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no frontend

10 - Desenvolva testes que cubram no mínimo 30 por cento dos arquivo backend em /src com um mínimo de 45 linhas cobertas

11 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com uma senha inválida no frontend

12 - Desenvolva o endpoint /login/validate no backend de maneira ele retorne os dados corretamente no frontend

13 - Desenvolva testes que cubram no mínimo 45 por cento dos arquivo backend em /src com um mínimo de 70 linhas cobertas

14 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams

15 - Desenvolva o endpoint /teams no backend de forma que ele possa retornar todos os times corretamente

16 - Desenvolva o endpoint /teams/:id no backend de forma que ele possa retornar dados de um time específico

17 - Desenvolva testes que cubram no mínimo 60 por cento dos arquivo backend em /src com um mínimo de 80 linhas cobertas

18 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches

19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no frontend

20 - Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do frontend

21 - Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do frontend

23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

24 - Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados

25 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais

26 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com time que não existe na tabela teams

27 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido

28 - Desenvolva o endpoint /matches de forma que seja possível atualizar partidas em andamento

29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados

30 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada

31 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados

32 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada

33 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend com os dados iniciais do banco de dados

34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada

</details>

<details>
<summary><strong>Diagrama Entidade-Relacionamento</strong></summary>
 
![image](https://user-images.githubusercontent.com/99846604/231586907-22ab3e1e-8b31-411c-acd3-1b77f143d5ba.png)
 
</details>

<details>
<summary><strong>Estrutura do Projeto</strong></summary> </br>
 
<strong>1.Banco de dados:</strong>

É um container docker MySQL já configurado no docker-compose através de um serviço definido como db.
Tem o papel de fornecer dados para o serviço de backend.
Durante a execução dos testes sempre vai ser acessado pelo sequelize e via porta 3002 do localhost;
Também pode ser conectado a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço db.
  
<strong>2.Back-end:</strong>

É o ambiente onde foram feitas as implementações das regras de negócio, rotas, validações e comunicação com o banco de dados.
Deve rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão;
A aplicação deve ser inicializada a partir do arquivo app/backend/src/server.ts;
Todas as dependências extras (tal como joi, boom, express-async-errors...) foram listadas em app/backend/packages.npm.
  
<strong>3.Front-end:</strong>

O front-end fará as requisições para o back-end e demonstrará para o usuário os resultados no navegador;
O front se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints construídos na API.
  
<strong>4.Docker:</strong>

O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up ou npm run compose:up:dev;
 
</details>
</br>

## ⚙️ Execução

Para executar a aplicação inicie realizando o clone deste repositório com o comando abaixo.

    git clone git@github.com:joaoespacheco/Trybe-Project-29-Futebol-Club.git

Navegue até a raíz do projeto.

    cd Trybe-Project-29-Futebol-Club/
      
Uma vez na raiz do projeto, execute o comando abaixo para instalar as dependências do projeto.
    
    npm install
<br/>

<details>
<summary><strong>Rodando a aplicação com o Docker</strong></summary>
</br>

Para subir o Docker vá até a raiz do projeto e digite o seguinte comando:


    docker-compose up -d


Para acessar o container app_backend e popular o db digite o segundo 


    docker exec app_backend -it bash && npm run db:reset

        
</details>
</br>

## ↪️ Rotas:

### :construction: Documentação das rotas em construção ! :construction:
      
</br>

## 🤹🏽 Habilidades Desenvolvidas:
* Criar uma aplicação utilizando Express.js e TypeScript
* Utilizar recursos como classes, interfaces, types entre outros
* Criar uma API RESTful utilizando arquitetura MSC (Model-Service-Controller)
* Validar os dados das requisições utilizando a biblioteca Joi
* Implementar autenticação via token utilizando JSON Web Token
* Implementar testes unitários utilizando Mocha, Chai, Sinon
</br>

## 🧰 Ferramentas:
* TypeScript
* Node.js
  * Express.js
  * Express Async Errors
* Sequeline
* MySQL
* DotEnv
* BCryptJS
* Joi
* JSON Web Token
* Mocha
* Chai
* Sinon
* Docker
* React
* HTML
* CSS
</br>

## 📝 Desenvolvido por:
* [João Emanuel Soares Pacheco](https://github.com/joaoespacheco)


