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
                for (let i = 0; i < resultado.dados.length; i++) {
                    gerarCard(resultado.dados[i]);
                }
            } else {
                alert("Nenhum agendamento encontrado!");
            }
        });
    } catch (err) {
        return err;
    }
});

function gerarCard(dados) {
    const card = document.createElement('div');
    const pagamento = document.createElement('p');
    const sala = document.createElement('h3');
    const detalhes = document.createElement('p');
    const hr = document.createElement('hr');
    const nome_medico = document.createElement('p');
    const especialidade = document.createElement('p');
    const dia = document.createElement('p');
    const hora = document.createElement('p');
    const email = document.createElement('p');
    const valor = document.createElement('p');
    const container = document.getElementById('container'); 

    card.className = "card";
    pagamento.textContent = "Agendamento digital";
    pagamento.className = "comprovante-pagamento";
    sala.textContent = dados.nome_sala;
    detalhes.textContent = "Detalhes";
    detalhes.className = "detalhes-pagamento";
    nome_medico.textContent = `Nome: ${dados.nome_medicos}`;
    especialidade.textContent = `Especialidade: ${dados.especialidade == null ? "" : dados.especialidade}`;
    dia.textContent = `Dia: ${new Date(dados.datas).toLocaleDateString('pt-BR')}`; 
    hora.textContent = `Horário: ${dados.hora}`;
    email.textContent = `E-mail: ${dados.email}`;
    valor.textContent = `Valor pago: ${dados.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    })}`;

    card.appendChild(pagamento);
    card.appendChild(hr);
    card.appendChild(sala);
    card.appendChild(detalhes);
    card.appendChild(nome_medico);
    card.appendChild(especialidade);
    card.appendChild(dia);
    card.appendChild(hora);
    card.appendChild(email);
    card.appendChild(valor);
    container.appendChild(card);
}