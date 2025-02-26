document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;

    // Exibe as informações no console ou na página
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Resultado da Consulta:</h3>
                           <p><strong>Título:</strong> ${title}</p>
                           <p><strong>Autor:</strong> ${author}</p>`;

    console.log("Consulta realizada:");
    console.log("Título do Livro:", title);
    console.log("Autor:", author);
});