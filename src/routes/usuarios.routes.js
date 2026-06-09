const express = require('express');
const router = express.Router();

const { listarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, removerUsuario } = require('../controllers/usuariosController');

router.get('/usuarios', listarUsuarios);

router.get('/usuarios/:id', buscarUsuarioPorId);

router.post('/criarUsuario', criarUsuario);

router.put('/atualizarUsuario/:id', atualizarUsuario)

router.delete('/removerUsuario/:id', removerUsuario)

module.exports = router;