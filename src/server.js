const express = require("express");
const server = express()

//configurar pasta pública
server.use(express.static("Public"))

//configurar o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//configurar as rotas da aplicação
server.get("/", (req,res) => {
  res.render("index.html")
})

server.get("/cadastro", (req,res) => {
  res.render("cadastro.html")
})

server.get("/search", (req,res) =>{
  res.render("search-cadastro.html")
})

//ligar o servidor
server.listen(3333)