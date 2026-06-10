const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')


const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexao.query(
            'SELECT id, nome, email FROM usuarios'
        );

        return res.status(200).json(usuarios);

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao buscar usuários',
            mensagem: error.message
        });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [usuario] = await conexao.query(
            'SELECT id, nome, email FROM usuarios WHERE id = ?',
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuario[0]);

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao buscar usuário',
            mensagem: error.message
        });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Nome, email e senha são obrigatórios'
            });
        }

        const [usuarioExistente] = await conexao.query(
            `SELECT usuarios.email FROM usuarios WHERE email = ?`, [email]
        )
        if(usuarioExistente.length > 0){
            return res.status(400).json({ erro: "Este email já foi utilizado."})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        
        const [result] = await conexao.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaCriptografada]
        );

        return res.status(201).json({
            mensagem: 'Usuário criado com sucesso',
            id: result.insertId
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao criar usuário',
            mensagem: error.message
        });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const [usuario] = await conexao.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await conexao.query(
            `UPDATE usuarios 
             SET nome = ?, email = ?, senha = ?
             WHERE id = ?`,
            [nome, email, senhaCriptografada, id]
        );

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao atualizar usuário',
            mensagem: error.message
        });
    }
};

const removerUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const [usuario] = await conexao.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        await conexao.query(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );

        return res.status(200).json({
            mensagem: 'Usuário removido com sucesso'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao remover usuário',
            mensagem: error.message
        });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    removerUsuario
};