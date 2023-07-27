const mercadopg = new MercadoPago('TEST-60d51c1b-102c-484b-af6f-b3e31d929e39', { locale: 'pt-BR' });
const btnFinalizar = document.getElementById('finalizarCompra');

btnFinalizar.addEventListener("click", () => {
    try {
        fetch('/verificarLogin', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                criarPagamento();
            });
    } catch (err) {
        return err;
    }
});

function criarPagamento() {
    try {
        fetch('/listCart', {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                for (let i = 0; i < resultado.itens.length; i++) {
                    const element = resultado.itens[i];

                    localStorage.setItem("uni" + i, JSON.stringify(element));
                }

                let dadosPagamento = {
                    quantity: 1,
                    description: "Carrinho Unifísio",
                    price: document.getElementById("valor_total").value
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
                        window.location.href = pagamento.init_point;
                    })
                    .catch((err) => {
                        alert(`Ocorreu um erro inesperado!, ${err}`);
                    });
            });
    } catch (err) {
        return err;
    }
}