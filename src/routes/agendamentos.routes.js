const express = require('express');
const router = express.Router();

const {listarAgendamentos, buscarAgendamentoPorId, criarAgendamento, removerAgendamento} = require('../controllers/agendamentosController');


router.get('/agendamentos', listarAgendamentos);

router.get('/agendamentos/:id', buscarAgendamentoPorId);

router.post('/criarAgendamento', criarAgendamento);

router.delete('/removerAgendamento', removerAgendamento)

module.exports = router;