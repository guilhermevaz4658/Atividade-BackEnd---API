const express = require('express');
const agendamentoRoutes = require('./routes/agendamentos.routes');
const usuariosRoutes = require('./routes/usuarios.routes')
const authRoute = require('./routes/auth.routes')


const app = express();
app.use(express.json());
app.use(express.static('public'))


app.get('/', (req, res) =>{
    res.send('API organizada funcionando')
})

app.use('/api', agendamentoRoutes);
app.use('/api', usuariosRoutes)
app.use('/api', authRoute)

module.exports = app;