 // Função para pesquisar livros na Open Library API
 async function pesquisarLivros() {
    const searchValue = document.getElementById("search").value.trim();
    const resultadosDiv = document.getElementById("resultados");

    // Se o campo de pesquisa estiver vazio, não faça nada
    if (!searchValue) {
        resultadosDiv.innerHTML = '';
        return;
    }

    try {
        // Fazendo a requisição para a Open Library API
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchValue)}&limit=10`); //https://openlibrary.org
        const data = await response.json();

        // Limpa os resultados anteriores
        resultadosDiv.innerHTML = '';

        // Verifica se existem livros encontrados
        if (data.docs.length > 0) {
            // Loop para exibir os livros
            data.docs.forEach(livro => {
                const livroElement = document.createElement("div");
                livroElement.classList.add("card", "mb-3");
                livroElement.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${livro.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${livro.author_name ? livro.author_name.join(", ") : "Autor desconhecido"}</h6>
                        <p class="card-text"><strong>Ano:</strong> ${livro.first_publish_year || "Data desconhecida"}</p>
                        <p class="card-text"><strong>Link:</strong> <a href="https://openlibrary.org${livro.key}" target="_blank">Ver mais detalhes</a></p>
                    </div>
                `;
                resultadosDiv.appendChild(livroElement);
            });
        } else {
            resultadosDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
        }
    } catch (error) {
        resultadosDiv.innerHTML = '<p>Ocorreu um erro ao buscar os dados. Tente novamente.</p>';
        console.error("Erro na requisição para a API:", error);
    }
}

