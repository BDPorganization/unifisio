const fragment = document.createDocumentFragment();
const container = document.getElementById('container'); 

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
            container.appendChild(fragment);
        })
    } catch (err) {
        return err;
    }
});

function onClickBtIncluirSala() {
    var nomeSala = document.getElementById("nomeSala").value;
    var descricaoSala = document.getElementById("descricaoSala").value;
    var valorSala = document.getElementById("valorSala").value;
    var imgSala = document.getElementById("imgSala");
    var image = imgSala.files[0].name;

    try {
        fetch('/adcSala', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomeSala, descricaoSala, valorSala, image })
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            if (resultado.salvarSala == true) {
                const formData = new FormData();

                formData.append('image', imgSala.files[0]);

                fetch('/upload', {
                    method: "POST",
                    body: formData
                })
                .then((response) => {
                    return response.json();
                })
                .then((resultado) => {
                    location.reload();
                })
                .catch((err) => {
                    alert("Erro na inserção da imagem:", err);
                })
            } else {
                alert("Erro na inserção da sala, tente novamente mais tarde!");
            }
        });
    } catch (err) {
        return err;
    }
};

function onClickBtExcluirSala(botao) {
    var hiddenInput = botao.nextElementSibling;
    var pk_sala = hiddenInput.value;

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
            if (resultado.excluirSala == true) {
                location.reload();
                alert("Sala excluída com sucesso!");
            } else {
                alert("Erro na exclusão da sala, tente novamente mais tarde!");
            }
        });
    } catch (err) {
        return err;
    }
};


function gerarCard(dados) {
    const card = document.createElement('div');
    const imgUrl = document.createElement('img');
    const sala = document.createElement('h3');
    const descricao = document.createElement('p');
    const valor = document.createElement('p');
    const button = document.createElement('button');
    const button2 = document.createElement('button');
    const input = document.createElement('input');

    card.className = 'card';
    sala.textContent = dados.nome;
    descricao.textContent = `Descrição: ${dados.descricao}`; 
    valor.textContent = `Preço unitário: ${dados.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    })}`;
    imgUrl.src = `/uploads/${dados.imgurl}`;
    button.type = 'button';
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i> Excluir sala';
    button.className = 'btn-styled';
    button2.innerHTML = '<i class="fa-solid fa-pencil"></i> Editar sala';
    button2.className = 'btn-styled2';
    button.onclick = function() {
        onClickBtExcluirSala(this);
    };
    button2.onclick = function() {
        
    };
    input.value = dados.pk_salas;
    input.type = 'hidden'
    input.className = 'input-hidden'

    card.appendChild(imgUrl);
    card.appendChild(sala);
    card.appendChild(descricao);
    card.appendChild(valor);
    card.appendChild(button);
    card.appendChild(button2);
    card.appendChild(input);
    fragment.appendChild(card);
}