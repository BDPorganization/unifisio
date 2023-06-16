const mercadopg = new MercadoPago('TEST-60d51c1b-102c-484b-af6f-b3e31d929e39', { locale: 'pt-BR' });
const botao_avancar = document.getElementById('avancar');
const modalLogin = document.getElementById('loginModal');
const avancar1 = document.getElementById('formDadosPessoais');

botao_avancar.addEventListener("click", () => {
    try {
        fetch('/verificarLogin', {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            if(resultado.autenticado == true){
                fetch('/checarDados', {
                    method: "POST"
                })
                .then((response) =>{
                    if (response.status == 204){
                        const formPreencher = document.getElementById('form-preencher');
                    
                        document.getElementById('avancar').style.display = 'none';
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
                                        criarPagamento();
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
                            document.getElementById('avancar').style.display = 'none';
                            criarPagamento();
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

function exibirFormDados(){
    var inputdate = document.getElementById('dateTime').value;

    if (inputdate == ""){
        alert('Escolha uma data para continuar');
    } else {
        let form = document.getElementById('formDadosPessoais');
        
        form.style.display = 'flex';
    }
}

function fecharFormDados(){
    var form = document.getElementById('formDadosPessoais');

    form.style.display = 'none';
}

function criarPagamento() {
    try {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let data = document.getElementById("dateTime").value;
        let pk_sala = document.getElementById("pk_sala").value;
        let name_sala = document.getElementById("product-description").innerHTML;
        let preco_sala = document.getElementById("unit-price").value;
        let email_user = document.getElementById("emailUser").value;
        let name_user = document.getElementById("nomeUsuario").innerHTML;
        let checkboxesMarcados = [];
        let arrayJson;
        let dadosPagamento;
    
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxesMarcados.push(checkboxes[i].name);
            }
        }
    
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].disabled = true;
        }
    
        document.getElementById("dateTime").disabled = true;
        arrayJson = JSON.stringify(checkboxesMarcados);
        localStorage.setItem("data", data);
        localStorage.setItem("pk_sala", pk_sala);
        localStorage.setItem("name_sala", name_sala);
        localStorage.setItem("preco_sala", preco_sala);
        localStorage.setItem("email_user", email_user);
        localStorage.setItem("name_user", name_user);
        localStorage.setItem("hora", arrayJson);
    
        dadosPagamento = {
            quantity: checkboxesMarcados.length,
            description: document.getElementById("product-description").innerHTML,
            price: document.getElementById("unit-price").value
        };
    
        fetch("/pagamento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosPagamento),
        })
        .then((response) => {
            return response.json();
        })
        .then((pagamento) => {
            createCheckoutButton(pagamento.id);
            document.getElementById("voltarPagamento").style.display = "inline-block";
        })
        .catch((err) => {
            alert(`Ocorreu um erro inesperado!, ${err}`);
        });
    } catch (err) {
        return err;
    }
}
  
function createCheckoutButton(pagamentoId) {
    mercadopg.checkout({
        preference: {
            id: pagamentoId
        },
        render: {
            container: '#button-checkout', 
        }
    });
}