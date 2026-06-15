const express = require('express');
const router = express.Router();

const login = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', login)

router.get('/perfil', authMiddleware, (req, res) => {
    return res.status(200).json({
        usuario: req.usuario
    })
})

module.exports = router