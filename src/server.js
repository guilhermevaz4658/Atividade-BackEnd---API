const app = require('./app');
const agendamentoRoutes = require('./routes/agendamentos.routes');
const usuariosRoutes = require('./routes/usuarios.routes')

app.use('/api', agendamentoRoutes);
app.use('/api', usuariosRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});