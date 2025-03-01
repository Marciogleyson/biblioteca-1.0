
let authorsData = []; // Armazenar todos os dados dos autores para pesquisa

// Função para carregar todos os autores
async function loadAuthors() {
    try {
        const response = await fetch('https://public.franciscosensaulas.com/api/v1/biblioteca/autores');
        authorsData = await response.json(); // Armazena todos os autores
        displayAuthors(authorsData); // Exibe todos os autores inicialmente
    } catch (error) {
        console.error('Erro ao carregar os autores:', error);
    }
}

// Função para exibir os autores na tabela
function displayAuthors(authors) {
    const authorsBody = document.getElementById('authorsBody');
    authorsBody.innerHTML = '';

    authors.forEach((author) => {
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${author.id}</td>
                    <td><input type="text" value="${author.nome}" data-id="${author.id}" class="edit-nome"></td>
                    <td><input type="text" value="${author.nacionalidade}" data-id="${author.id}" class="edit-nacionalidade"></td>
                    <td><input type="date" value="${author.dataNascimento}" data-id="${author.id}" class="edit-dataNascimento"></td>
                    <td><button onclick="saveChanges(${author.id})">Salvar</button></td>
                `;

        authorsBody.appendChild(row);
    });
}

// Função para buscar autores pelo nome
function searchAuthor() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredAuthors = authorsData.filter(author =>
        author.nome.toLowerCase().includes(searchInput)
    );
    displayAuthors(filteredAuthors); // Exibe apenas os autores filtrados
}

// Função para salvar as alterações
async function saveChanges(id) {
    const nomeInput = document.querySelector(`.edit-nome[data-id="${id}"]`);
    const nacionalidadeInput = document.querySelector(`.edit-nacionalidade[data-id="${id}"]`);
    const dataNascimentoInput = document.querySelector(`.edit-dataNascimento[data-id="${id}"]`);

    const updatedAuthor = {
        nome: nomeInput.value,
        nacionalidade: nacionalidadeInput.value,
        dataNascimento: dataNascimentoInput.value
    };

    try {
        const response = await fetch(`https://public.franciscosensaulas.com/api/v1/biblioteca/autores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAuthor)
        });

        if (response.ok) {
            alert('Autor atualizado com sucesso!');
            loadAuthors(); // Recarregar os dados atualizados
        } else {
            alert('Erro ao atualizar autor.');
        }
    } catch (error) {
        console.error('Erro ao salvar alterações:', error);
        alert('Erro ao salvar alterações.');
    }
}

// Carregar os dados dos autores quando a página for carregada
window.onload = loadAuthors;
