const express = require('express');
const router = express.Router();

const {listarAgendamentos, buscarAgendamentoPorId, criarAgendamento, removerAgendamento} = require('../controllers/agendamentosController');
const authMiddleware = require('../middleware/authMiddleware')



router.get('/agendamentos', authMiddleware, listarAgendamentos);

router.get('/agendamentos/:id', authMiddleware, buscarAgendamentoPorId);

router.post('/criarAgendamento', authMiddleware, criarAgendamento);

router.delete('/removerAgendamento', authMiddleware, removerAgendamento)

module.exports = router;