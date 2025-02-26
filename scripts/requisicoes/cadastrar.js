
let urlAPI = "https://public.franciscosensaulas.com"
//let urlAPI = "https://public.franciscosensaulas.com/api/v1/biblioteca/autores"
function cadastrarAutor() {
    let nome = document.getElementById('nome').value;
    let nacionalidade = document.getElementById('nacionalidade').value;
    let dataNascimento = document.getElementById('dataNascimento').value;
    let messageDiv = document.getElementById('message');

    // Verifica se todos os campos foram preenchidos
    if (nome && nacionalidade && dataNascimento) {
        let autorData = {
            nome: nome,
            nacionalidade: nacionalidade,
            dataNascimento: dataNascimento
        };

        // Envia os dados para o servidor via requisição POST
        let url = `${urlAPI}/api/v1/biblioteca/autores`;
        fetch('https://public.franciscosensaulas.com/api/v1/biblioteca/autores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autorData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.innerHTML = `<p class="success">${data.message}</p>`;
            } else {
                messageDiv.innerHTML = `<p class="error">${data.message}</p>`;
            }
        })
        .catch(error => {
            messageDiv.innerHTML = `<p class="error">Erro ao cadastrar. Tente novamente.</p>`;
            console.error('Error:', error);
        });

    } else {
        messageDiv.innerHTML = `<p class="error">Por favor, preencha todos os campos.</p>`;
    }
    
}

