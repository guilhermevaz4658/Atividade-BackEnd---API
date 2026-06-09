const express = require('express');
const router = express.Router();

const {listarAgendamentos, buscarAgendamentoPorId, criarAgendamento} = require('../controllers/agendamentosController');


router.get('/agendamentos', listarAgendamentos);

router.get('/agendamentos/:id', buscarAgendamentoPorId);

router.post('/criarAgendamento', criarAgendamento);

module.exports = router;