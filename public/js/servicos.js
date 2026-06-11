async function carregarServicos() {
	const lista = document.getElementById('lista-servicos');

	try {
		const resposta = await fetch('/api/servicos');

		if (!resposta.ok) {
			lista.innerHTML = '<li>Erro ao carregar serviços.</li>';
			return;
		}

		const servicos = await resposta.json();

		lista.innerHTML = '';

		if (servicos.length === 0) {
			lista.innerHTML = '<li>Nenhum serviço cadastrado.</li>';
			return;
		}

		servicos.forEach((servico) => {
			const item = document.createElement('li');

			item.textContent = `${servico.nome} - R$ ${servico.preco}`;

			lista.appendChild(item);
		});
	} catch (erro) {
		console.error(erro);
		lista.innerHTML = '<li>Erro de conexão com a API.</li>';
	}
}

carregarServicos();

const formServico = document.getElementById('form-servico');

formServico.addEventListener('submit', async (event) => {
	event.preventDefault();

	const nome = document.getElementById('nome').value;
	const preco = document.getElementById('preco').value;
	const mensagem = document.getElementById('mensagem');

	if (!nome || !preco) {
		mensagem.textContent = 'Preencha nome e preço.';
		return;
	}

	try {
		const resposta = await fetch('/api/servicos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nome: nome,
				preco: Number(preco)
			})
		});

		const dados = await resposta.json();

		if (!resposta.ok) {
			mensagem.textContent = dados.mensagem || 'Erro ao cadastrar serviço.';
			return;
		}

		mensagem.textContent = dados.mensagem;

		formServico.reset();

		carregarServicos();
	} catch (erro) {
		console.error(erro);
		mensagem.textContent = 'Erro de conexão com a API.';
	}
});