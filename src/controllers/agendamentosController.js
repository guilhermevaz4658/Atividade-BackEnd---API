const conexao = require('../database/conexao');


const listarAgendamentos = async (req, res) => {
    try {
        const [agendamentos] = await conexao.query(`
            SELECT
                agendamentos.id,
                agendamentos.data_agendamento,
                usuarios.nome AS usuario_nome,
                servicos.nome AS servico_nome,
                servicos.preco
            FROM agendamentos
            INNER JOIN usuarios
                ON agendamentos.usuario_id = usuarios.id
            INNER JOIN servicos
                ON agendamentos.servico_id = servicos.id
            ORDER BY agendamentos.data_agendamento ASC
        `);

        return res.status(200).json(agendamentos);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        });
    }
};

const buscarAgendamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [agendamento] = await conexao.query(`
            SELECT
                agendamentos.id,
                usuarios.nome AS usuario_nome,
                servicos.nome AS servico_nome,
                servicos.preco,
                agendamentos.data_agendamento
            FROM agendamentos
            INNER JOIN usuarios
                ON agendamentos.usuario_id = usuarios.id
            INNER JOIN servicos
                ON agendamentos.servico_id = servicos.id
            WHERE agendamentos.id = ?
        `, [id]);

        if (agendamento.length === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }

        return res.status(200).json(agendamento[0]);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        });
    }
};

const criarAgendamento = async (req, res) => {
    try {
        const { date, usuarioID, servicoID } = req.body;

        if (!date || !usuarioID || !servicoID) {
            return res.status(400).json({
                erro: "Usuário, serviço e data precisam ser informados"
            });
        }

        const [usuario] = await conexao.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [usuarioID]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        const [servico] = await conexao.query(
            "SELECT * FROM servicos WHERE id = ?",
            [servicoID]
        );

        if (servico.length === 0) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        const [novoAgendamento] = await conexao.query(
            `INSERT INTO agendamentos
            (data_agendamento, usuario_id, servico_id)
            VALUES (?, ?, ?)`,
            [date, usuarioID, servicoID]
        );

        return res.status(201).json({
            mensagem: "Agendamento criado com sucesso",
            id: novoAgendamento.insertId
        });

    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        });
    }
};

module.exports = {
    listarAgendamentos,
    buscarAgendamentoPorId,
    criarAgendamento
};