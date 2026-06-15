const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/login.html';
}

const botaoSair = document.getElementById('botao-sair')

if (botaoSair) {
    botaoSair.addEventListener('click', () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')

        window.location.href = '/login.html'
    })
}

function formatarData(valor) {
    const data = new Date(valor);

    return data.toLocaleString('pt-BR');
}

async function carregarAgendamentos() {
    const tabela = document.getElementById('tabela-agendamentos');

    try {
        const resposta = await fetch('/api/agendamentos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (resposta.status === 401 || resposta.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = '/login.html';
            return;
        }


        if (!resposta.ok) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="5">Erro ao carregar agendamentos.</td>
                </tr>
            `;
            return;
        }

        const agendamentos = await resposta.json();

        tabela.innerHTML = '';

        if (agendamentos.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="5">Nenhum agendamento cadastrado.</td>
                </tr>
            `;
            return;
        }

        agendamentos.forEach((agendamento) => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${agendamento.id}</td>
                <td>${agendamento.usuario_nome}</td>
                <td>${agendamento.servico_nome}</td>
                <td>R$ ${agendamento.preco}</td>
                <td>${agendamento.data_agendamento}</td>
            `;

            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error(erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="5">Erro de conexão com a API.</td>
            </tr>
        `;
    }
}

carregarAgendamentos();