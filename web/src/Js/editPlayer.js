let data; 

window.addEventListener('load', () => {
    fetch('http://localhost:7070/players/all')  
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ocorreu um erro na obtenção dos dados.');
            }
        })
        .then((responseData) => {
            data = responseData;

            console.log(data);
        });

        editar = (dados) => {
            document.getElementById('nome').value = dados.nome;
            document.getElementById('funcao').value = dados.funcao;
            document.getElementById('personagem').value = dados.personagem;
        }
});