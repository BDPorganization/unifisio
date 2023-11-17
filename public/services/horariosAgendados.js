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
                appendAlert("Nenhum agendamento encontrado!", 'warning');
                return;
            }
        });
    } catch (err) {
        return err;
    }
});

const date = document.getElementById('dataInput');

date.addEventListener("change", function() {
    try {
        const dateNew = date.value;
        const sala = document.getElementById('pk_sala').value;

        bloquearDiaEspecifico(dateNew);
    
        fetch('/filtroData', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dateNew, sala })
        })
        .then((response) => {
            if (response.status == 204) {
                appendAlert("Nenhum horário encontrado para o dia selecionado!", 'warning');
                return false;
            }
            return response.json();
        })
        .then((resultado) => {
            createCheckboxesFromJSON(resultado.datas);
            exibirDatasFuturas();
        });
    } catch (err) {
        return err;
    }
});

function exibirDatasFuturas() {
    var dataAtual = new Date();

    date.min = dataAtual.toISOString().split('T')[0];
}

function bloquearDiaEspecifico(date) {
    var dataSelecionada = new Date(date);
    var div_main =  document.getElementById("div-main");

    if (datas_bloqueadas) {
        for (let i = 0; i < datas_bloqueadas.length; i++) {
            let diaBloqueado = new Date(datas_bloqueadas[i].dias);
    
            if (dataSelecionada.toISOString().split('T')[0] === diaBloqueado.toISOString().split('T')[0]) {
                date.value = "";
                appendAlert("O dia selecionado está indisponível!", 'danger');
                div_main.style.display = "none";
                document.getElementById("adcCart").style.display = "none";
                return;
            } else {
                div_main.style.display = "";
                document.getElementById("adcCart").style.display = "";
            }
        }
    }

    if (datas_planos) {
        for (let i = 0; i < datas_planos.length; i++) {
            let diaPlanos = new Date(datas_planos[i].datas);
            let diaPlanosPkSala = datas_planos[i].fk_salas_pk_salas;
            let salaAlugadaPlano = document.getElementById("pk_sala").value;
            
            if (dataSelecionada.toISOString().split('T')[0] === diaPlanos.toISOString().split('T')[0] && salaAlugadaPlano == diaPlanosPkSala) {
                date.value = "";
                appendAlert("O dia selecionado está indisponível!", 'warning');
                div_main.style.display = "none";
                document.getElementById("adcCart").style.display = "none";
                return;
            } else {
                div_main.style.display = "";
                document.getElementById("adcCart").style.display = "";
            }
        }
    }
}

function createCheckboxesFromJSON(jsonData) {
    try {
        const container = document.getElementById('containerId');
        const p = document.getElementById('label-hora');
      
        container.innerHTML = '';
        p.innerHTML = 'Selecione seu horário:';
        for (let i = 0; i < jsonData.length; i++) {
            const checkbox = document.createElement('input');
            const label = document.createElement('label');
            const span = document.createElement('span');
            let horarios = jsonData[i].horario_disponivel;
            let partes = horarios.split(':');
            let horas = parseInt(partes[0], 10);
            let minutos = parseInt(partes[1], 10);
            let horaFormatada = horas < 10 ? "0" + horas : horas;
            let minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
            let horaFinal = `${horaFormatada}:${minutosFormatados}`;
    
            checkbox.type = 'checkbox';
            checkbox.name = horaFinal;
            label.appendChild(document.createTextNode(horaFinal));
            label.style.margin = '3px';
            label.classList.add("checkbox-card");
            span.classList.add("checkmark");
            container.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(span)
        }
    } catch (err) {
        return err;
    }
}

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
        data.textContent = `${new Date (resultado.dados[i]["datas"]).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} ${resultado.dados[i]["datas_fim"] !== null ? ' - ' + new Date(resultado.dados[i]["datas_fim"]).toLocaleDateString('pt-BR') : ""}`;
        horario.textContent =`${resultado.dados[i]["hora"] == "00:00:00" ? "Plano" : resultado.dados[i]["hora"]}`;
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
                    appendAlert("Erro na exclusão do agendamento, tente novamente mais tarde!", 'danger');
                    return;
                }
            });
        }
    } catch (err) {
        alert("Nenhum agendamento selecionado!");
        return err;
    }
}

function reagendarAgendamento() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_agendamento = checkedCheckbox.value;

        if (pk_agendamento) {
            fetch('/reagendarAgendamento', {
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
                    appendAlert("Erro na exclusão do agendamento, tente novamente mais tarde!", 'danger');
                    return;
                }
            });
        }
    } catch (err) {
        alert("Nenhum agendamento selecionado!");
        return err;
    }
}