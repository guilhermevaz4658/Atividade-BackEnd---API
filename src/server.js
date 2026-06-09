const app = require('./app');
const agendamentoRoutes = require('./routes/agendamentos.routes');

app.use('/api', agendamentoRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});