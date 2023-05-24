window.addEventListener("load", ()=> {
    try {
        fetch('/checarAgendamentos', {
            method: "POST"
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
    const sala = document.createElement('h3');
    const dia = document.createElement('p');
    const descricao = document.createElement('p');
    const hora = document.createElement('p');
    const email = document.createElement('p');
    const valor = document.createElement('p');
    const container = document.getElementById('container'); 

    card.className = 'card';
    sala.textContent = dados.nome;
    dia.textContent = `Dia: ${new Date(dados.datas).toLocaleDateString('pt-BR')}`; 
    descricao.textContent = `Descrição: ${dados.descricao}`; 
    hora.textContent = `Horário: ${dados.hora}`;
    email.textContent = `E-mail: ${dados.email}`;
    valor.textContent = `Preço unitário: R$${dados.valor}`;

    card.appendChild(sala);
    card.appendChild(dia);
    card.appendChild(descricao);
    card.appendChild(hora);
    card.appendChild(email);
    card.appendChild(valor);
    container.appendChild(card);
}