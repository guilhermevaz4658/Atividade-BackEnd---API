const express = require('express');
const router = express.Router();

const { listarServicos, buscarServicoPorId, criarServico, atualizarServico, removerServico} = require('../controllers/servicosController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/servicos', listarServicos);

router.get('/servicos/:id', buscarServicoPorId);

router.post('/servicos', authMiddleware, criarServico);

router.put('/servicos/:id', authMiddleware, atualizarServico);

router.delete('/servicos/:id', authMiddleware, removerServico);

module.exports = router;