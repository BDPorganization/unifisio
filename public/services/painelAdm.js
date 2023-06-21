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
                    return resultado;
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

function onClickBtEditarModal() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_sala = checkedCheckbox.value;
        let nome_sala = document.getElementById("nome");
        let peq_descricao = document.getElementById("peqDescricao");
        let long_descricao = document.getElementById("longDescricao");
        let preco = document.getElementById("valor");

        dadosSala.forEach((dado) => {
            if (dado.pk_salas == pk_sala) {
                nome_sala.value = dado.nome;
                peq_descricao.value = dado.descricao;
                long_descricao.value = dado.descricao_longa;
                preco.value = dado.valor;
            }
        });
    } catch (err) {
        let modal = document.getElementById("edtSalaModal");

        alert("Nenhuma sala selecionada!");
        modal.style.display = "none";
        return err;
    }
}

function onClickBtEditarSala() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_sala = checkedCheckbox.value;
    var nome_sala = document.getElementById("nome").value;
    var peq_descricao = document.getElementById("peqDescricao").value;
    var long_descricao = document.getElementById("longDescricao").value;
    var preco = document.getElementById("valor").value;

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
            if (resultado.editarSala == true) {
                location.reload();
            } else {
                alert("Erro na edição da sala, tente novamente mais tarde!");
            }
        });
    } catch (err) {
        return err;
    }
};

function onClickBtExcluirSala() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_sala = checkedCheckbox.value;

        if (pk_sala) {
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
                } else {
                    alert("Erro na exclusão da sala, tente novamente mais tarde!");
                }
            });
        } else {
            alert("Nenhuma sala selecionada!");
        }
    } catch (err) {
        return err;
    }
};

function onClickBtBloquearDia() {
    try {
        let blockDay = document.getElementById("dataInput").value;

        if (blockDay) {
            fetch('/bloquearDia', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blockDay })
            })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.bloquearDia == true) {
                    alert("Data bloqueada com sucesso!");
                    location.reload();
                } else {
                    alert("Erro ao bloquear, tente novamente mais tarde!");
                }
            });
        } else {
            alert("Nenhum dia selecionado para bloquear!");
        }
    } catch (err) {
        return err;
    }
}

function gerarCard(dados) {
    try {
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
    } catch (err) {
        return err;
    }
}