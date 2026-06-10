const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        const { email, senha } = req.body
        if(!email || !senha){
            return res.status(400).json({
                message: "Email e senha são obrigatórios!"
            })
        }
        const [usuarios] = await conexao.query(
            `SELECT * FROM usuarios WHERE usuarios.email = ?`, [email]
        )
        if(usuarios.length === 0){
          return res.status(404).json({ erro: 'Email ou senha inválidos'});  
        }

        const usuario = usuarios[0]

        const verificar = await bcrypt.compare(senha, usuario.senha)
        if(!verificar){
            return res.status(404).json({ erro: 'Email ou senha inválidos'})
        }

        return res.status(200).json({ 
            menssagem: "Login realizado com sucesso",
            usuário: {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email
            }
        })

    } catch (error) {
         return res.status(500).json({
            erro: 'Erro ao realizar login',
            mensagem: error.message
        });
    }
}

module.exports = login