// Função para pesquisar livros
function pesquisarLivros() {
    const termo = document.getElementById("pesquisaTermo").value.trim();

    // Verifica se o termo de pesquisa tem pelo menos 1 caractere
    if (termo.length < 1) {
        document.getElementById("livrosResultado").innerHTML = '';
        return; // Não faz a pesquisa se o termo for vazio
    }

    // Exibe uma mensagem de carregando enquanto a pesquisa está em andamento
    document.getElementById("livrosResultado").innerHTML = 'Carregando resultados...';

    // Fazendo a requisição para a API para pesquisar livros
    fetch(`https://public.franciscosensaulas.com/api/v1/biblioteca/autores`)
        .then(response => response.json())
        .then(data => {
            const livrosResultado = document.getElementById('livrosResultado');
            livrosResultado.innerHTML = ''; // Limpa os resultados anteriores

            // Filtra os dados com base no nome
            const livrosFiltrados = data.filter(livro => 
                livro.nome && livro.nome.toLowerCase().includes(termo.toLowerCase())
            );

            if (livrosFiltrados.length === 0) {
                livrosResultado.innerHTML = '<li>Nenhum livro encontrado.</li>';
            } else {
                // Adiciona os livros encontrados na lista
                livrosFiltrados.forEach(livro => {
                    const li = document.createElement('li');
                    // Exibe apenas o nome do livro ou autor
                    // li.textContent = livro.nome || 'Título desconhecido';
                    li.textContent = `${livro.nome || 'Título desconhecido'} por ${livro.nacionalidade || 'Nacionalidade desconhecida'} (Nascimento: ${livro.dataNascimento || 'Ano desconhecido'})`;
                    livrosResultado.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao pesquisar livros:', error);
            document.getElementById("livrosResultado").innerHTML = '<li>Erro ao pesquisar livros.</li>';
        });
}

