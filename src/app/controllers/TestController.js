class TesteController {

    teste(req, res) {
        return res.send({msg: 'Chegou na rota de teste'})
    }
}

module.exports = new TesteController()