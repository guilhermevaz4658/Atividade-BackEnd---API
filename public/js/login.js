const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    if (!email || !senha) {
        mensagem.textContent = 'Preencha email e senha.';
        return;
    }

    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.mensagem || 'Erro ao fazer login.';
            return;
        }

        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.usuario));

        mensagem.textContent = 'Login realizado com sucesso.';

        window.location.href = '/agendamentos.html';
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = 'Erro de conexão com a API.';
    }
});