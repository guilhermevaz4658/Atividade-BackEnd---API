const jwt = require('jsonwebtoken')



const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                erro: 'Token não fornecido!'
            })
        }

        const token = authHeader.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                erro: 'Token inválido!'
            })
        }

        const usuario = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = usuario

        next()

    } catch (error) {
        return res.status(401).json({
            erro: 'Não autorizado',
            mensagem: error.message
        })
    }
}

module.exports = authMiddleware