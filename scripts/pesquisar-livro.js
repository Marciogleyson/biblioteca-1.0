// Função de debounce para atrasar a execução da pesquisa
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

async function pesquisarAutores() {
    const searchValue = document.getElementById("search").value.trim();
    const resultadosDiv = document.getElementById("resultados");

    // Se o campo de pesquisa estiver vazio, não faça nada
    if (!searchValue) {
        resultadosDiv.innerHTML = '';
        return;
    }

    try {
        // Fazendo a requisição para a API para buscar todos os autores
        const response = await fetch('https://public.franciscosensaulas.com/api/v1/biblioteca/autores');

        if (!response.ok) {
            // Se a resposta da API não for bem-sucedida (status diferente de 2xx)
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Log da resposta para entender a estrutura dos dados
        console.log("Resposta da API:", data);

        // Limpa os resultados anteriores
        resultadosDiv.innerHTML = '';

        // Verifica se existem autores encontrados
        if (Array.isArray(data) && data.length > 0) {
            // Filtra os autores que correspondem ao termo de pesquisa
            const autoresFiltrados = data.filter(autor => {
                // Verifica se o nome do autor contém o termo de pesquisa (case insensitive)
                return autor.nome && autor.nome.toLowerCase().includes(searchValue.toLowerCase());
            });

            if (autoresFiltrados.length > 0) {
                // Cria um container para os resultados
                const resultadoFragment = document.createDocumentFragment();
                
                autoresFiltrados.forEach(autor => {
                    const autorElement = document.createElement("div");
                    autorElement.classList.add("card");

                    // Garantindo que os dados sejam exibidos corretamente
                    const nome = autor.nome || "Nome desconhecido";
                    const nacionalidade = autor.nacionalidade || "Nacionalidade desconhecida";
                    const dataNascimento = autor.dataNascimento || "Data de nascimento desconhecida";

                    autorElement.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5>
                            <p class="card-text"><strong>Nacionalidade:</strong> ${nacionalidade}</p>
                            <p class="card-text"><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
                        </div>
                    `;
                    resultadoFragment.appendChild(autorElement);
                });

                // Adiciona todos os elementos ao DOM de uma vez
                resultadosDiv.appendChild(resultadoFragment);
            } else {
                resultadosDiv.innerHTML = '<p>Nenhum autor encontrado com esse nome.</p>';
            }
        } else {
            resultadosDiv.innerHTML = '<p>Nenhum autor encontrado.</p>';
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        resultadosDiv.innerHTML = `<p>Ocorreu um erro: ${error.message}. Tente novamente.</p>`;
    }
}

// Adiciona o evento de input para realizar a pesquisa com debounce
document.getElementById("search").addEventListener("input", debounce(pesquisarAutores, 500));
