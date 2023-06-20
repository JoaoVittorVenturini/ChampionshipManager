window.addEventListener('load', () => {
    const tabela = document.getElementById('table');
    const tbody = tabela.querySelector('tbody');

    fetch('http://localhost:7070/players/all')  
        .then((response) => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error('Ocorreu um erro na obtenção dos dados.');
            }
        })
        .then((data) => {
            console.log(data);
            
            for (let i = 0; i < data.length; i++) {
                let newRow = tbody.insertRow();
                newRow.insertCell().textContent = data[i].id;
                newRow.insertCell().textContent = data[i].nome;
                newRow.insertCell().textContent = data[i].funcao;
                newRow.insertCell().textContent = data[i].personagem;
                newRow.insertCell().textContent = data[i].time;
            }
        })
        .catch((error) => {
            console.error('Erro de conexão com a API:', error);
        });
});