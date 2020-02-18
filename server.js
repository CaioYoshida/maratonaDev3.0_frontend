// configurando o servidor
const express = require('express');
const server = express();

// configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'));

//Habilitar body do formulário
server.use(express.urlencoded({ extended: true }));

// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: server,
  noCache: true,
});

const donors = [
  {
    name: "Diego Fernandes",
    blood: "AB+"
  },
  {
    name: "Cleiton Souza",
    blood: "B+"
  },
  {
    name: "Robson Marques",
    blood: "A+"
  },
  {
    name: "Mayk Brito",
    blood: "O+"
  },
]

// configurar a apresentação da pagina
server.get('/', function(req, res) {
  return res.render('index.html', { donors });
})

server.post('/', function(req, res) {
  // pegar dados no formulário
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  // coloco valores dentro do array
  donors.push({
    name,
    blood,
  });

  return res.redirect('/');
})

// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, () => console.log('Server running on port 3000'));