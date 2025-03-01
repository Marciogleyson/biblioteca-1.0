
let livrosData = []; // Armazenar os dados recebidos da API

// Função para buscar os dados da API
async function fetchLivros() {
    try {
        const response = await fetch('https://public.franciscosensaulas.com/api/v1/biblioteca/autores');

        // Verifique se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const data = await response.json();
        console.log(data);  // Adicionando log para verificar os dados

        // Armazenar os dados e preencher a tabela
        if (data && data.length > 0) {
            livrosData = data;
            preencherTabela(livrosData);
        } else {
            alert("Nenhum dado encontrado.");
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        alert('Erro ao carregar os dados.');
    }
}

// Função para preencher a tabela com os dados
function preencherTabela(dados) {
    const tabelaBody = document.getElementById('table-body');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preencher

    if (Array.isArray(dados) && dados.length > 0) {
        dados.forEach(livro => {
            // Verifique se o objeto contém as chaves esperadas
            const nome = livro.nome || "Não disponível";
            const nacionalidade = livro.nacionalidade || "Não disponível";
            const dataNascimento = livro.dataNascimento || "Não disponível";

            const tr = document.createElement('tr');
            tr.innerHTML = `
                        <td>${nome}</td>
                        <td>${nacionalidade}</td>
                        <td>${dataNascimento}</td>
                    `;
            tabelaBody.appendChild(tr);
        });
    } else {
        tabelaBody.innerHTML = '<tr><td colspan="3">Nenhum livro encontrado.</td></tr>';
    }
}

// Função para gerar o PDF
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título do PDF
    doc.text("Relatório de Livros", 10, 10);

    // Adiciona as colunas no PDF
    doc.text("Nome", 10, 20);
    doc.text("Nacionalidade", 60, 20);
    doc.text("Data Nascimento", 120, 20);

    // Preenche os dados da tabela no PDF
    let yOffset = 30;
    livrosData.forEach(livro => {
        doc.text(livro.nome, 10, yOffset);
        doc.text(livro.nacionalidade, 60, yOffset);
        doc.text(livro.dataNascimento.toString(), 120, yOffset);
        yOffset += 10;
    });

    // Salva o PDF
    doc.save('relatorio_livros.pdf');
}

// Função para filtrar a tabela com base na busca em tempo real
function filtrarTabela() {
    const query = document.getElementById('search-box').value.toLowerCase();

    // Filtra os dados por autor, título ou ano
    const dadosFiltrados = livrosData.filter(livro => {
        return (
            livro.nome.toLowerCase().includes(query) ||  // Busca pelo nome
            livro.nacionalidade.toLowerCase().includes(query) || // Busca pela nacionalidade
            livro.dataNascimento.toString().includes(query)  // Busca pela data de nascimento
        );
    });

    // Atualiza a tabela com os dados filtrados
    preencherTabela(dadosFiltrados);
}

// Carregar os dados assim que a página for carregada
window.onload = fetchLivros;
