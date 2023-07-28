window.addEventListener("load", ()=> {
    try {
        fetch('/horariosAgendados', {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            if (resultado.horariosAgendados == true) {
                gerarTabela(resultado);
                
            } else {
                alert("Nenhum agendamento encontrado!");
                return;
            }
        });
    } catch (err) {
        return err;
    }
});

function gerarTabela(resultado) {
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

    nome.textContent = "Nome";
    sala.textContent = "Sala";
    especialidade.textContent = "Especialidade";
    data.textContent = "Data";
    horario.textContent = "Horário";
    valor.textContent = "Valor";

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
        const checkboxWrapper  = document.createElement('label');
        const checkbox = document.createElement('input');
        const checkmark = document.createElement('span');
    
        nome.textContent = resultado.dados[i]["nome_medicos"];
        sala.textContent = resultado.dados[i]["nome_sala"];
        especialidade.textContent = resultado.dados[i]["especialidade"];
        data.textContent = new Date (resultado.dados[i]["datas"]).toLocaleDateString('pt-BR');
        horario.textContent = resultado.dados[i]["hora"];
        valor.textContent = resultado.dados[i]["valor"].toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
        checkboxWrapper.className = 'checkbox-wrapper';
        checkbox.type = 'checkbox';
        checkbox.value = resultado.dados[i]["pk_agendamento"];
        checkmark.className = 'checkmark';

    
        tr.appendChild(nome);
        tr.appendChild(sala);
        tr.appendChild(especialidade);
        tr.appendChild(data);
        tr.appendChild(horario);
        tr.appendChild(valor);
        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(checkmark);
        //checkboxWrapper.appendChild(document.createTextNode(' Selecione'));
        tr.appendChild(checkboxWrapper);
        
        tbody.appendChild(tr);
    }
    container.appendChild(tbody);
}

function filtrarTabela() {
    const input = document.getElementById('filtroInput');
    const termo = input.value.toLowerCase();
    const tabela = document.getElementById('table');
    const linhas = tabela.getElementsByTagName('tr');
  
    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];
        const colunas = linha.getElementsByTagName('td');
        let correspondencia = false;
  
        for (let j = 0; j < colunas.length; j++) {
            const coluna = colunas[j];

            if (coluna.textContent.toLowerCase().indexOf(termo) > -1) {
                correspondencia = true;
                break;
            }
        }
  
        if (correspondencia) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

function filtrarTabelaMobile() {
    const input = document.getElementById('filtroInputMobile');
    const termo = input.value.toLowerCase();
    const tabela = document.getElementById('table');
    const linhas = tabela.getElementsByTagName('tr');
  
    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];
        const colunas = linha.getElementsByTagName('td');
        let correspondencia = false;
  
        for (let j = 0; j < colunas.length; j++) {
            const coluna = colunas[j];

            if (coluna.textContent.toLowerCase().indexOf(termo) > -1) {
                correspondencia = true;
                break;
            }
        }
  
        if (correspondencia) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

function filtrarHoje() {
    const dataAtual = new Date().toLocaleDateString();
    const tabela = document.getElementById('table');
    const linhas = tabela.getElementsByTagName('tr');
  
    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];
        const colunas = linha.getElementsByTagName('td');
        let correspondencia = false;
  
        for (let j = 0; j < colunas.length; j++) {
            const coluna = colunas[j];

            if (coluna.textContent.toLowerCase().indexOf(dataAtual) > -1) {
                correspondencia = true;
                break;
            }
        }
  
        if (correspondencia) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

function cancelarAgendamento() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_agendamento = checkedCheckbox.value;

        if (pk_agendamento) {
            fetch('/excluirAgendamento', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pk_agendamento })
            })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.excluirAgendamento == true) {
                    location.reload();
                } else {
                    alert("Erro na exclusão do agendamento, tente novamente mais tarde!");
                    return;
                }
            });
        }
    } catch (err) {
        alert("Nenhum agendamento selecionado!");
        return err;
    }
}