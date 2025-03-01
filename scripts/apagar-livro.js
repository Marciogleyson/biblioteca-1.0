
let autoresData = []; // Variável para armazenar todos os autores

// Função para carregar autores da API
async function carregarAutores() {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ''; // Limpa os resultados anteriores

    try {
        // Fazendo a requisição GET para buscar todos os autores
        const response = await fetch('https://public.franciscosensaulas.com/api/v1/biblioteca/autores');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        autoresData = await response.json();
        console.log("Autores recebidos:", autoresData);

        exibirAutores(autoresData); // Exibe todos os autores inicialmente

    } catch (error) {
        console.error("Erro ao carregar autores:", error);
        resultadosDiv.innerHTML = `<p>Ocorreu um erro: ${error.message}</p>`;
    }
}

// Função para exibir autores na página
function exibirAutores(autores) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ''; // Limpa a lista atual

    if (autores.length > 0) {
        autores.forEach(autor => {
            const autorElement = document.createElement("div");
            autorElement.classList.add("autor");

            const nome = autor.nome || "Nome desconhecido";
            const nacionalidade = autor.nacionalidade || "Nacionalidade desconhecida";
            const dataNascimento = autor.dataNascimento || "Data de nascimento desconhecida";

            autorElement.innerHTML = `
                        <div>
                            <h5>${nome}</h5>
                            <p><strong>Nacionalidade:</strong> ${nacionalidade}</p>
                            <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
                        </div>
                        <button class="btn-apagar" onclick="apagarAutor(${autor.id})">Apagar</button>
                    `;
            resultadosDiv.appendChild(autorElement);
        });
    } else {
        resultadosDiv.innerHTML = '<p>Nenhum autor encontrado.</p>';
    }
}

// Função para apagar um autor
async function apagarAutor(autorId) {
    const resultadosDiv = document.getElementById("resultados");

    try {
        // Fazendo a requisição DELETE para apagar o autor
        const response = await fetch(`https://public.franciscosensaulas.com/api/v1/biblioteca/autores/${autorId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        // Exibe uma mensagem de sucesso e recarrega a lista
        alert('Autor removido com sucesso!');
        carregarAutores(); // Recarrega a lista de autores

    } catch (error) {
        console.error("Erro ao apagar o autor:", error);
        alert(`Erro ao remover o autor: ${error.message}`);
    }
}

// Função para filtrar autores
function filtrarAutores() {
    const filtro = document.getElementById("filtro").value.toLowerCase();
    const autoresFiltrados = autoresData.filter(autor => {
        return autor.nome && autor.nome.toLowerCase().includes(filtro);
    });
    exibirAutores(autoresFiltrados); // Exibe os autores filtrados
}

// Função para apagar todos os autores
async function apagarTodosAutores() {
    if (confirm("Tem certeza que deseja apagar todos os autores?")) {
        try {
            // Vamos apagar os autores um por um
            for (const autor of autoresData) {
                const response = await fetch(`https://public.franciscosensaulas.com/api/v1/biblioteca/autores/${autor.id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Erro ao apagar autor ${autor.id}: ${response.status} - ${response.statusText}`);
                }
            }

            // Após apagar todos, recarrega a lista
            alert('Todos os autores foram removidos com sucesso!');
            carregarAutores(); // Recarrega a lista de autores

        } catch (error) {
            console.error("Erro ao apagar todos os autores:", error);
            alert(`Erro ao remover os autores: ${error.message}`);
        }
    }
}

// Carrega os autores ao iniciar a página
carregarAutores();
