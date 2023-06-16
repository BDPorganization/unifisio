window.addEventListener("load", ()=> {
    try {
        fetch('/horariosAgendados', {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            console.log(resultado);
            if (resultado.horariosAgendados == true) {
                gerarTabela(resultado);
                
            } else {
                alert("Nenhum agendamento encontrado!");
            }
        });
    } catch (err) {
        return err;
    }
});

function gerarTabela(resultado) {

    // criando tabela
    var container = document.getElementById('table');

    gerarCabecalho(container);
    gerarCorpo(container, resultado);
}

function gerarCabecalho(container) {
    const header = document.createElement('thead');
    const tr = document.createElement('tr');
    const nome = document.createElement('th');
    const sala = document.createElement('th');
    const especialidade = document.createElement('th');
    const data = document.createElement('th');
    const horario = document.createElement('th');
    const valor = document.createElement('th');

    nome.textContent = "nome";
    sala.textContent = "sala";
    especialidade.textContent = "especialidade";
    data.textContent = "data";
    horario.textContent = "horario";
    valor.textContent = "valor";

    tr.appendChild(nome);
    tr.appendChild(sala);
    tr.appendChild(especialidade);
    tr.appendChild(data);
    tr.appendChild(horario);
    tr.appendChild(valor);
    
    header.appendChild(tr);
    container.appendChild(header);
}

function gerarCorpo(container, resultado) {
    const tbody = document.createElement('tbody');
    
    for (let i = 0; i < resultado.dados.length; i++) {
        const tr = document.createElement('tr');
        const nome = document.createElement('td');
        const sala = document.createElement('td');
        const especialidade = document.createElement('td');
        const data = document.createElement('td');
        const horario = document.createElement('td');
        const valor = document.createElement('td');
    
        nome.textContent = resultado.dados[i]["nome_medicos"];
        sala.textContent = resultado.dados[i]["nome_sala"];
        especialidade.textContent = resultado.dados[i]["especialidade"];
        data.textContent = resultado.dados[i]["datas"]
        horario.textContent = resultado.dados[i]["hora"];
        valor.textContent = resultado.dados[i]["valor"];
    
        tr.appendChild(nome);
        tr.appendChild(sala);
        tr.appendChild(especialidade);
        tr.appendChild(data);
        tr.appendChild(horario);
        tr.appendChild(valor);
        
        tbody.appendChild(tr);
    }
    
    container.appendChild(tbody);
}