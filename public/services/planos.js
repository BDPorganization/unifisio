const fragment = document.createDocumentFragment();
const container = document.getElementById('container');
var dadosPlanos = [];
const modalAlugar = document.getElementById('planoModal');

window.addEventListener("load", () => {
    try {
        fetch('/checarPlanos', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado) {
                    for (let i = 0; i < resultado.dados.length; i++) {
                        gerarCard(resultado.dados[i]);
                        dadosPlanos.push(resultado.dados[i]);
                    }
                    container.appendChild(fragment);
                } else {
                    appendAlert("Nenhum plano encontrado!", 'warning');
                    return;
                }
            })
    } catch (err) {
        return err;
    }
});

function gerarCard(dados) {
    try {
        const card = document.createElement('div');
        const plano = document.createElement('h3');
        const tipo = document.createElement('p');
        const duracao_em_dias = document.createElement('p');
        const descricao = document.createElement('p');
        const valor = document.createElement('p');
        const botao = document.createElement('button');
        const tipo_params = dados.tipo;
        const preco_params = dados.preco;
        const descricao_params = dados.descricao;

        card.className = 'card';
        plano.textContent = dados.nome;
        tipo.textContent = `Tipo: ${dados.tipo}`;
        duracao_em_dias.textContent = `Duração em dias: ${dados.duracao_em_dias}`;
        descricao.textContent = `Descrição: ${dados.descricao}`;
        valor.textContent = `Preço do plano: ${dados.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        })}`;
        botao.className = 'btn btn-primary text-white';
        botao.textContent = 'Alugar';
        botao.addEventListener('click', () => {
            abrirModal(modalAlugar, tipo_params, preco_params, descricao_params);
        });

        card.appendChild(plano);
        card.appendChild(tipo);
        card.appendChild(duracao_em_dias);
        card.appendChild(descricao);
        card.appendChild(valor);
        card.appendChild(botao);
        fragment.appendChild(card);
    } catch (err) {
        return err;
    }
}

function abrirModal(element, tipo_params, preco_params, descricao_params) {
    document.getElementById("tipo_plano").value = tipo_params;
    document.getElementById("precoPlano").value = preco_params;
    document.getElementById("descricaoPlano").value = descricao_params;
    element.classList.add("show");
    element.style.display = "block";
}

function fecharModal(element) {
    document.getElementById("tipo_plano").value = "";
    element.classList.remove("show");
    element.style.display = "none";
}

function alugarPlano() {
    const dataSelecionada = document.getElementById('inputDate').value;
    const planoSelecionado = document.getElementById("tipo_plano").value;
    const precoPlano = document.getElementById("precoPlano").value;
    const descricaoPlano = document.getElementById("descricaoPlano").value;
    let diasPermitidos;

    if (dataSelecionada == "") {
        alert("Escolha uma data para continuar");
        return false;
    }

    switch (planoSelecionado) {
        case 'Diário':
            let params = {
                tipo: planoSelecionado,
                dia: dataSelecionada,
                preco: precoPlano,
                descricao: descricaoPlano
            }
            alugarDiario(params);
            break;
        case 'Semanal':
            diasPermitidos = 7;
            break;
        case 'Mensal':
            diasPermitidos = 30;
            break;
        default:
            diasPermitidos = 0;
            break;
    }

    const diferencaEmDias = Math.ceil((dataSelecionada - new Date()) / (1000 * 60 * 60 * 24));
    console.log(diferencaEmDias)

    if (diferencaEmDias <= 0 || diferencaEmDias > diasPermitidos) {
        alert('Seleção de data inválida para o plano selecionado.');
        return false;
    }
    return true;
}

function alugarDiario(params) {
    try {
        fetch('/verificarLogin', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.autenticado == true) {
                    fetch('/checarDados', {
                        method: "POST"
                    })
                        .then((response) => {
                            if (response.status == 204) {
                                const formPreencher = document.getElementById('form-preencher');

                                fecharModal(modalAlugar);
                                exibirFormDados();
                                formPreencher.addEventListener("submit", (event) => {
                                    event.preventDefault();

                                    const formData = new FormData(event.target);
                                    const nome = formData.get('nome');
                                    const data_nascimento = formData.get('data_nascimento');
                                    const cpf = formData.get('cpf');
                                    const cep = formData.get('cep');
                                    const rua = formData.get('rua');
                                    const numero = formData.get('numero');

                                    try {
                                        fetch('/preencher_dados', {
                                            method: "POST",
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ nome, data_nascimento, cpf, cep, rua, numero })
                                        })
                                            .then((response) => {
                                                return response.json();
                                            })
                                            .then((resultado) => {
                                                if (resultado.preenchido == true) {
                                                    formPreencher.reset();
                                                    fecharFormDados();
                                                    adcCart(params);
                                                }
                                                return resultado;
                                            })
                                    } catch (err) {
                                        return err;
                                    }
                                });
                            } else {
                                adcCart(params);
                            }
                        });
                } else {
                    fecharModal(modalAlugar);
                    appendAlert("Faça login para concluir a compra!", "warning");
                }
            });
    } catch (err) {
        return err;
    }
}

function exibirFormDados() {
    var form = document.getElementById('formDadosPessoais');

    form.style.display = 'flex';
}

function fecharFormDados() {
    var form = document.getElementById('formDadosPessoais');

    form.style.display = 'none';
}

function adcCart(params) {
    try {
        const { tipo, dia, preco, descricao } = params;

        if (tipo == "Diário") {
            let data = {
                data_agendada: dia,
                pk_sala: document.getElementById("pk_sala").value,
                name_sala: descricao,
                preco_sala: preco,
                email_user: document.getElementById("emailUser").value,
                name_user: document.getElementById("nomeUsuario").innerHTML,
                horarios: "0"
            };

            fetch("/listCart", {
                method: "GET",
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    if (result.listCart == true) {
                        const cartItems = result.itens;
                        let itemAlreadyInCart = false;

                        for (let i = 0; i < cartItems.length; i++) {
                            const element = cartItems[i];

                            if (element.pk_sala == data.pk_sala && element.data_agendada == data.data_agendada && element.horarios == data.horarios) {
                                itemAlreadyInCart = true;
                                fecharModal(modalAlugar);
                                appendAlert('Você não pode incluir itens que já estão no carrinho!', 'danger');
                                break;
                            }
                        }

                        if (!itemAlreadyInCart) {
                            fetch("/addCart", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })
                                .then((response) => {
                                    return response.json();
                                })
                                .then((resultado) => {
                                    fecharModal(modalAlugar);
                                    appendAlert('Incluso no carrinho!', 'success');
                                    verificaCart();
                                })
                                .catch((err) => {
                                    alert(`Ocorreu um erro inesperado!, ${err}`);
                                });
                        }
                    } else {
                        fetch("/addCart", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((resultado) => {
                                fecharModal(modalAlugar);
                                appendAlert('Incluso no carrinho!', 'success');
                                verificaCart();
                            })
                            .catch((err) => {
                                alert(`Ocorreu um erro inesperado!, ${err}`);
                            });
                    }
                })
                .catch((err) => {
                    alert("Ocorreu um erro inesperado!", err);
                    return err;
                });
        }
    } catch (err) {
        return err;
    }
}