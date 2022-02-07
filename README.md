## Sobre o projeto

O projeto visa mostrar qualidade de código, padrões de design e organização.

Todos os dados são fornecidos pelas APIs do TMDB. [API TMDb](https://www.themoviedb.org/documentation/api).

## 📥 Instalação e execução
Faça um clone desse repositório e acesse o diretório.

```bash
$ git clone git@github.com:luisfelrib/lfr-tmdb.git && cd lfr-tmdb
```
Após isso existem 2 maneiras de executar o projeto:

**1- Você precisará do [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/). Depois de instalados siga os passos abaixo.** 
```bash
$ cd production
$ docker-compose up -d
```
Verifique se a aplicação está no ar em http://localhost:5000

---
**2- Você pode executar a aplicação do Node manualmente, para isso precisará ter [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) instalado. Se quiser habilitar o cache deve ter o [Redis](https://redis.io/topics/quickstart) instalado também.**
- PS: Para facilitar se já tiver no computador o Docker e o Docker Compose configurados, basta executar o docker-compose.yaml da raiz, ele irá subir um MySQL e um Redis:

- 1- Você precisará de uma chave de API do TMDB, basta criar uma conta no TMDB para ter acesso, [link do cadastro](https://www.themoviedb.org/signup). Caminho da chave: **Perfil -> Configurações -> API -> Chave da API**

- 2- Se utilizou o docker-compose pule para o passo 5.
- 3- Com o MySQL instalado crie o banco **thintmdb**. Verifique no arquivo `.env` as variaveis **MYSQL_USER** e **MYSQL_PASS**.
- 4- No arquivo `.env` copie e cole o valor da sua chave do TMDB no campo **TMDB_API_KEY**.
- 5- Instale os Módulos do Node e depois execute o start:
```bash
# Instalando as dependências
$ npm install
# Executanto aplicação
$ npm start
```
- Verifique se a aplicação está no ar em http://localhost:5000

(Opcional) No arquivo `.env` para habilitar cache, tenha o Redis instalado e coloque **true** em **CACHE_ENABLE**. Verifique também as variáveis **REDIS_HOST**, **REDIS_PORT** e **REDIS_PASS**.

---

## 📚 Documentação de API's
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/641946-c1d7ec1c-ad01-433c-a734-27cce0339f47?action=collection%2Ffork&collection-url=entityId%3D641946-c1d7ec1c-ad01-433c-a734-27cce0339f47%26entityType%3Dcollection%26workspaceId%3Db3cc4b76-1440-4235-a32c-73f6d747adf6)

---

## Funcionalidades

- [x] **Trending Movies**: Traz os filmes em alta dos últimos 7 dias. Existe opção de cache diário.

- [x] **Trending TV Shows**: Traz as series em alta na TV nos últimos 7 dias. Existe opção de cache diário.

- [x] **User Playlist (My List)**: Permiti salvar uma lista com favoritos.

- [x] **TV/Movie Details**: Traz detalhes do filme ou série direto TMBD.

- [x] **Create User/Login**: Permiti criar um usuário e logar para adicionar favoritos.

---

## Frontend
- O repositório de código do front está no link:
https://github.com/luisfelrib/lfr-tmdb-front

