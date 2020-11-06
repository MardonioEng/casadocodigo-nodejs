const LivroDAO = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `);
    });
    
    app.get('/livros', function(req, resp) {
        const livroDAO = new LivroDAO(db);
        livroDAO.lista()
                .then(livros => resp.marko(
                    require('../../views/livros/lista/lista.marko'), 
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log('erro'));
    });

    app.get('/buscaLivro/:id', function(req, resp) {
        const livroDAO = new LivroDAO(db);
        const idLivro = req.params.id;
        livroDAO.buscaPorId(idLivro)
            .then(livro => console.log(`O livro encontrado foi: ${livro.titulo}!`))
            .catch(erro => console.log("erro ao buscar livro pelo ID"));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req, resp) {
        console.log(req.body);
        const livroDAO = new LivroDAO(db);
        livroDAO.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log('erro'));
    });
};

