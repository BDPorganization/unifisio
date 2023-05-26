window.addEventListener("load", ()=> {
    try {
        fetch('/checarAgendamentos', {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            for (let i = 0; i < resultado.dados.length; i++) {
                gerarCard(resultado.dados[i]);
            }
        })
    } catch (err) {
        return err;
    }
});

function gerarCard(dados) {
    const card = document.createElement('div');
    const logo = document.createElement('img');
    const pagamento = document.createElement('p');
    const sala = document.createElement('h3');
    const valor = document.createElement('p');
    const detalhes = document.createElement('p');
    const hr = document.createElement('hr');
    const dia = document.createElement('p');
    const hora = document.createElement('p');
    const email = document.createElement('p');
    const container = document.getElementById('container'); 

    card.className = "card";
    logo.src = "http://localhost:3000/public/img/logo_png.png"
    pagamento.textContent = "Comprovante digital";
    pagamento.className = "comprovante-pagamento";
    sala.textContent = dados.nome;
    valor.textContent = `${dados.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    })}`;
    valor.className = "valor-reais";
    detalhes.textContent = "Detalhes";
    detalhes.className = "detalhes-pagamento";
    dia.textContent = `Dia: ${new Date(dados.datas).toLocaleDateString('pt-BR')}`; 
    hora.textContent = `Horário: ${dados.hora}`;
    email.textContent = `E-mail: ${dados.email}`;

    //card.appendChild(logo);
    card.appendChild(pagamento);
    card.appendChild(sala);
    card.appendChild(valor);
    card.appendChild(detalhes);
    card.appendChild(hr);
    card.appendChild(dia);
    card.appendChild(hora);
    card.appendChild(email);
    container.appendChild(card);
}