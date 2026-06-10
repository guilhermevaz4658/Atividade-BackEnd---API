const conexao = require('../database/conexao');

const listarServicos = async (req, res) => {
    try {
        const [servicos] = await conexao.query(
            'SELECT * FROM servicos'
        );

        return res.status(200).json(servicos);

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao buscar serviços',
            mensagem: error.message
        });
    }
};

const buscarServicoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [servico] = await conexao.query(
            'SELECT * FROM servicos WHERE id = ?',
            [id]
        );

        if (servico.length === 0) {
            return res.status(404).json({ erro: 'Serviço não encontrado' });
        }

        return res.status(200).json(servico[0]);

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao buscar serviço',
            mensagem: error.message
        });
    }
};

const criarServico = async (req, res) => {
    try {
        const { nome, preco, ativo } = req.body;

        if (!nome || preco == null) {
            return res.status(400).json({
                erro: 'Nome e preço são obrigatórios'
            });
        }

        const [result] = await conexao.query(
            'INSERT INTO servicos (nome, preco, ativo) VALUES (?, ?, ?)',
            [nome, preco, ativo ?? true]
        );

        return res.status(201).json({
            mensagem: 'Serviço criado com sucesso',
            id: result.insertId
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao criar serviço',
            mensagem: error.message
        });
    }
};

const atualizarServico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, ativo } = req.body;

        const [servico] = await conexao.query(
            'SELECT * FROM servicos WHERE id = ?',
            [id]
        );

        if (servico.length === 0) {
            return res.status(404).json({ erro: 'Serviço não encontrado' });
        }

        await conexao.query(
            `UPDATE servicos 
             SET nome = ?, preco = ?, ativo = ?
             WHERE id = ?`,
            [nome, preco, ativo, id]
        );

        return res.status(200).json({
            mensagem: 'Serviço atualizado com sucesso'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao atualizar serviço',
            mensagem: error.message
        });
    }
};

const removerServico = async (req, res) => {
    try {
        const { id } = req.params;

        const [servico] = await conexao.query(
            'SELECT * FROM servicos WHERE id = ?',
            [id]
        );

        if (servico.length === 0) {
            return res.status(404).json({ erro: 'Serviço não encontrado' });
        }

        await conexao.query(
            'DELETE FROM servicos WHERE id = ?',
            [id]
        );

        return res.status(200).json({
            mensagem: 'Serviço removido com sucesso'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao remover serviço',
            mensagem: error.message
        });
    }
};

module.exports = {
    listarServicos,
    buscarServicoPorId,
    criarServico,
    atualizarServico,
    removerServico
};