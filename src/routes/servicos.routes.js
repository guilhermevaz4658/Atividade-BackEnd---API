const express = require('express');
const router = express.Router();

const { listarServicos, buscarServicoPorId, criarServico, atualizarServico, removerServico} = require('../controllers/servicosController');

router.get('/servicos', listarServicos);

router.get('/servicos/:id', buscarServicoPorId);

router.post('/servicos', criarServico);

router.put('/servicos/:id', atualizarServico);

router.delete('/servicos/:id', removerServico);

module.exports = router;