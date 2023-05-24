const btnExcluirSala = document.querySelector("button");
console.log(btnExcluirSala);

window.addEventListener("load", ()=> {
    try {
        fetch('/checarSalas', {
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

if (btnExcluirSala) {
    btnExcluirSala.addEventListener("click", ()=> {
        var pk_sala = document.getElementsByClassName("input-hidden").value;
        console.log(pk_sala);
    
        try {
            fetch('/excluirSala', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pk_sala })
            })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                console.log(resultado);
                //location.reload();
            })
        } catch (err) {
            return err;
        }
    });
}

function gerarCard(dados) {
    const card = document.createElement('div');
    const imgUrl = document.createElement('img');
    const sala = document.createElement('h3');
    const descricao = document.createElement('p');
    const valor = document.createElement('p');
    const button = document.createElement('button');
    const input = document.createElement('input');
    const container = document.getElementById('container'); 

    card.className = 'card';
    sala.textContent = dados.nome;
    descricao.textContent = `Descrição: ${dados.descricao}`; 
    valor.textContent = `Preço unitário: R$${dados.valor}`;
    imgUrl.src = "https://img.freepik.com/vetores-gratis/gato-e-gatinho-brincam-no-sofa-na-sala-de-estar-vetor_107791-19007.jpg?size=626&ext=jpg&ga=GA1.2.691316326.1676481620&semt=sph";
    button.type = 'button';
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i> Excluir sala';
    button.className = 'btn-styled';
    button.name = 'btn-excluir';
    input.value = dados.pk_salas;
    input.type = 'hidden'
    input.className = 'input-hidden'

    card.appendChild(imgUrl);
    card.appendChild(sala);
    card.appendChild(descricao);
    card.appendChild(valor);
    card.appendChild(button);
    card.appendChild(input);
    container.appendChild(card);
}