const mercadopg = new MercadoPago('TEST-60d51c1b-102c-484b-af6f-b3e31d929e39', { locale: 'pt-BR' });
const botao_avancar = document.getElementById('avancar');
const modalLogin = document.getElementById('loginModal');
const avancar1 = document.getElementById('formDadosPessoais');

botao_avancar.addEventListener("click", () => {
    fetch('/verificarLogin', {
        method: "POST"
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
                    exibirFormDados();
                }else {
                    let dadosPagamento = {
                        quantity: document.getElementById("quantity").value,
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
                    })
                    .catch((err) => {
                        alert(`Ocorreu um erro inesperado!, ${err}`);
                    });
                }
            })
        }else {
            abrirModal(modalLogin);
        }
    })
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "block";
}

function exibirFormDados(){
    var inputdate = document.getElementById('dateTime').value;

    if (inputdate == ''){
        alert('Escolha uma data para continuar');
    }else {
        let form = document.getElementById('formDadosPessoais');
        
        form.style.display = 'flex';
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