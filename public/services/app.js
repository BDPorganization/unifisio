const mercadopago = new MercadoPago('TEST-60d51c1b-102c-484b-af6f-b3e31d929e39', { locale: 'pt-BR' });
const btnCheck = document.getElementById("checkout");
const btnQuant = document.getElementById("quantity");

if (btnCheck) {
  btnCheck.addEventListener("click", ()=> {
    const dadosPagamento = {
      quantity: document.getElementById("quantity").value,
      description: document.getElementById("product-description").value,
      price: document.getElementById("unit-price").value
    };
  
    console.log(dadosPagamento);
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
      document.getElementById('sumario').style.display = 'none';
    })
    .catch((err) => {
      alert(`Ocorreu um erro inesperado!, ${err}`);
    });
  });
}

function createCheckoutButton(pagamentoId) {
  mercadopago.checkout({
    preference: {
      id: pagamentoId
    },
    render: {
      container: '#button-checkout', 
    }
  });
}