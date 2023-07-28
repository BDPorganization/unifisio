const botao_adcCart = document.getElementById("adcCart");
const inputData = document.getElementById('dateTime');
const modalLogin = document.getElementById('loginModal');

inputData.addEventListener('change', mostrarBotao);

function mostrarBotao() {
    document.getElementById("adcCart").style.display = "inline-block";
}

botao_adcCart.addEventListener("click", () => {
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
                                                    adcCart();
                                                }
                                                return resultado;
                                            })
                                    } catch (err) {
                                        return err;
                                    }
                                });
                            } else {
                                let inputdate = document.getElementById('dateTime').value;

                                if (inputdate == "") {
                                    alert('Escolha uma data para continuar');
                                } else {
                                    adcCart();
                                }
                            }
                        });
                } else {
                    abrirModal(modalLogin);
                }
            });
    } catch (err) {
        return err;
    }
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "block";
}

function fecharModal(element) {
    element.classList.remove("show");
    element.style.display = "none";
}

function exibirFormDados() {
    var inputdate = document.getElementById('dateTime').value;

    if (inputdate == "") {
        alert('Escolha uma data para continuar');
    } else {
        let form = document.getElementById('formDadosPessoais');

        form.style.display = 'flex';
    }
}

function fecharFormDados() {
    var form = document.getElementById('formDadosPessoais');

    form.style.display = 'none';
}

function adcCart() {
    try {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let data_agendada = document.getElementById("dateTime").value;
        let pk_sala = document.getElementById("pk_sala").value;
        let name_sala = document.getElementById("product-description").innerHTML;
        let preco_sala = document.getElementById("unit-price").value;
        let email_user = document.getElementById("emailUser").value;
        let name_user = document.getElementById("nomeUsuario").innerHTML;
        let horarios = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                horarios.push(checkboxes[i].name);
            }
        }

        let data = {
            data_agendada: data_agendada,
            pk_sala: pk_sala,
            name_sala: name_sala,
            preco_sala: preco_sala,
            email_user: email_user,
            name_user: name_user,
            horarios: horarios
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

                        for (let j = 0; j < horarios.length; j++) {
                            const elemento = horarios[j];

                            if (element.pk_sala == pk_sala && element.data_agendada == data_agendada && element.horarios == elemento) {
                                itemAlreadyInCart = true;
                                break;
                            }
                        }

                        if (itemAlreadyInCart) {
                            alert("Você não pode incluir itens que já estão no carrinho!");
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
                                alert("Incluso no carrinho!");
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
                            alert("Incluso no carrinho!");
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
    } catch (err) {
        return err;
    }
}