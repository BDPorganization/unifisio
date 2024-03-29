const fragment = document.createDocumentFragment();
const container = document.getElementById('container');
var dadosSala = [];

window.addEventListener("load", () => {
    try {
        fetch('/checarSalas', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado) {
                    for (let i = 0; i < resultado.dados.length; i++) {
                        gerarCard(resultado.dados[i]);
                        dadosSala.push(resultado.dados[i]);
                    }
                    container.appendChild(fragment);
                } else {
                    appendAlert("Nenhuma sala encontrada!", 'warning');
                    return;
                }
            })
    } catch (err) {
        return err;
    }
});

function onClickBtIncluirSala() {
    var nomeSala = document.getElementById("nomeSala").value;
    var descricaoSala = document.getElementById("descricaoSala").value;
    var longDescricaoSala = document.getElementById("longDescricaoSala").value;
    var valor = document.getElementById("valorSala").value;
    var valorSala = valor.substring(3).replace(",", ".");
    var tags = document.getElementById("tagsSala").value;
    var arrayTags = tags.split(';');
    var imgSala = document.getElementById("imgSala");
    var imageSize = imgSala.files[0].size;
    var image = imgSala.files[0].name;

    if (imageSize > 2 * 1024 * 1024) {
        alert("A imagem é muito grande. O tamanho máximo permitido é de 2MB.");
        return;
    }

    try {
        fetch('/adcSala', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomeSala, descricaoSala, longDescricaoSala, valorSala, arrayTags, image })
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
                            return;
                        })
                } else {
                    alert("Erro na inserção da sala, tente novamente mais tarde!");
                    return;
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
                preco.value = parseFloat(dado.valor).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            }
        });
    } catch (err) {
        alert("Nenhuma sala selecionada!");
        return err;
    }
}

function onClickBtEditarSala() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_sala = checkedCheckbox.value;
    var nome_sala = document.getElementById("nome").value;
    var peq_descricao = document.getElementById("peqDescricao").value;
    var long_descricao = document.getElementById("longDescricao").value;
    var valor = document.getElementById("valor").value;
    var preco = valor.substring(3).replace(",", ".");

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
                    return;
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
                        return;
                    }
                });
        }
    } catch (err) {
        alert("Nenhuma sala selecionada!");
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
                    } else {
                        alert("Erro ao bloquear, tente novamente mais tarde!");
                        return;
                    }
                });
        } else {
            alert("Nenhum dia selecionado para bloquear!");
            return;
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
        const checkboxWrapper = document.createElement('label');
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

function formatarMoeda(params) {
    try {
        if (params === 0) {
            const valorInput = document.getElementById('valorSala');
            const valorNumerico = parseFloat(valorInput.value.replace(/[^\d.-]/g, ''));
            const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            valorInput.value = valorFormatado;
        } else if (params === 1) {
            const valorInput = document.getElementById('valor');
            const valorNumerico = parseFloat(valorInput.value.replace(/[^\d.-]/g, ''));
            const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            valorInput.value = valorFormatado;
        }
    } catch (err) {
        return err;
    }
}

function onClickBtCarregarDiasBloqueados() {
    try {
        document.getElementById("containerDias").innerHTML = "";

        fetch('/checarDiasBloqueados', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.diasBloqueados == true) {
                    document.getElementById("texto-desbloquear").innerHTML = "Selecione o dia para desbloquear:"
                    for (let i = 0; i < resultado.dados.length; i++) {
                        const containerDias = document.getElementById("containerDias");
                        const checkbox = document.createElement('input');
                        const label = document.createElement('label');
                        const span = document.createElement('span');
                        let dias = resultado.dados[i].dias;
                        let myDate = new Date(dias).toLocaleString().split(',')[0];


                        checkbox.type = 'checkbox';
                        checkbox.name = myDate;
                        checkbox.value = resultado.dados[i].pk_dias_indisponiveis;
                        label.appendChild(document.createTextNode(myDate));
                        label.style.margin = '3px';
                        label.classList.add("checkbox-card");
                        span.classList.add("checkmarkDia");
                        container.appendChild(label);
                        label.appendChild(checkbox);
                        label.appendChild(span);
                        containerDias.appendChild(label);
                    }
                } else {
                    document.getElementById("texto-desbloquear").innerHTML = "Nenhuma data bloqueada!"
                    return;
                }
            })
    } catch (err) {
        return err;
    }
}

function onClickBtDesbloquearDia() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_dias_indisponiveis = checkedCheckbox.value;

    try {
        fetch('/excluirDiaBloqueado', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pk_dias_indisponiveis })
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.excluirDiaBloqueado == true) {
                    alert("Data desbloqueada com sucesso!");
                    onClickBtCarregarDiasBloqueados();
                } else {
                    alert("Erro ao desbloquear, tente novamente mais tarde!!");
                    return;
                }
            })
    } catch (err) {
        return err;
    }
}