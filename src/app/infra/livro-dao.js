class LivroDAO {

    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function(err) {
                    if(err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro.');
                    }
                    resolve();
                }
             )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if(erro) return reject('Não foi possível  listar os livros.');
                    return resolve(resultados);
                }
            )
        });
        
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE ID = ?',
                [id],
                (erro, resultado) => {
                    if(erro) return reject('Não foi possível encontrar o livro.');
                    return resolve(resultado);
                } 
            )
        });
    }

    /*
    buscaPorId(id)
    atualiza(livro)
    remove(id)
    */

}


module.exports = LivroDAO;