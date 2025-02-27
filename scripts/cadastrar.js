
let urlAPI = "https://public.franciscosensaulas.com"
//let urlAPI = "https://public.franciscosensaulas.com/api/v1/biblioteca/autores"
function cadastrarAutor(c) {
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
         alert("Cadastrado com Sucesso!!")
         location.href = 'index.html'
        
    } else {
        messageDiv.innerHTML = `<p class="error">Por favor, preencha todos os campos.</p>`;
    }
    
}


