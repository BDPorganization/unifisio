const fragment = document.createDocumentFragment();
const container = document.getElementById('container');
var dadosSala = [];

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
                dadosSala.push(resultado.dados[i]);
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
    var longDescricaoSala = document.getElementById("longDescricaoSala").value;
    var valorSala = document.getElementById("valorSala").value;
    var imgSala = document.getElementById("imgSala");
    var image = imgSala.files[0].name;

    try {
        fetch('/adcSala', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomeSala, descricaoSala, longDescricaoSala, valorSala, image })
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

function onClickBtEditarSala() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_sala = checkedCheckbox.value;
    var nome_sala = document.getElementById("nome").value;
    var peq_descricao = document.getElementById("peqDescricao").value;
    var long_descricao = document.getElementById("longDescricao").value;
    var preco = document.getElementById("valor").value;

    console.log(dadosSala);

    dadosSala.forEach((dado) => {
        if (dado.pk_salas == pk_sala) {
            console.log('O nome foi encontrado:', dado.nome);
            console.log('Descrição:', dado.descricao);
            console.log('Valor:', dado.valor);
            console.log('PK Salas:', dado.pk_salas);
            console.log('Imagem URL:', dado.imgurl);
        }
    });

    try {
        fetch('/editarSala', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pk_sala, nome_sala, peq_descricao, long_descricao, preco })
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            console.log(resultado);
            if (resultado.editarSala == true) {
                location.reload();
                alert("Sala editada com sucesso!");
            } else {
                alert("Erro na edição da sala, tente novamente mais tarde!");
            }
        });
    } catch (err) {
        return err;
    }
};

function onClickBtExcluirSala() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_sala = checkedCheckbox.value;
    
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
    const checkboxWrapper  = document.createElement('label');
    const checkbox = document.createElement('input');
    const checkmark = document.createElement('span');

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
    checkboxWrapper.className = 'checkbox-wrapper';
    checkbox.type = 'checkbox';
    checkbox.value = dados.pk_salas;
    checkmark.className = 'checkmark';
    
    card.appendChild(imgUrl);
    card.appendChild(sala);
    card.appendChild(descricao);
    card.appendChild(valor);
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkmark);
    checkboxWrapper.appendChild(document.createTextNode('Selecione a sala'));
    card.appendChild(checkboxWrapper);
    fragment.appendChild(card);
}