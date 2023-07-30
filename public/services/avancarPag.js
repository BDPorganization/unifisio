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
                localStorage.clear();

                for (let i = 0; i < resultado.itens.length; i++) {
                    const element = resultado.itens[i];

                    localStorage.setItem("uni" + i, JSON.stringify(element));
                }

                let dadosPagamento = {
                    quantity: 1,
                    description: "Consultórios Unifísio",
                    price: document.getElementById("valor_total").value
                };

                for (let j = 0; j < resultado.itens.length; j++) {
                    const elemento = resultado.itens[j];
                    console.log(elemento.data_agendada)
                    let dataFormatada = converterParaFormatoISO(elemento.data_agendada);
                    let dadosSalas = {
                        data: dataFormatada,
                        horarios: elemento.horarios + ':00',
                        pk_sala: elemento.pk_sala
                    }

                    fetch("/checarSalasAgendadas", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dadosSalas),
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((resultado) => {
                            if (resultado.checaSalasAgendadas == true) {
                                alert("Horários indisponíveis no momento!");
                                return;
                            }// } else {
                            //     fetch("/pagamento", {
                            //         method: "POST",
                            //         headers: {
                            //             "Content-Type": "application/json",
                            //         },
                            //         body: JSON.stringify(dadosPagamento),
                            //     })
                            //         .then((response) => {
                            //             return response.json();
                            //         })
                            //         .then((pagamento) => {
                            //             window.location.href = pagamento.init_point;
                            //         })
                            //         .catch((err) => {
                            //             alert(`Ocorreu um erro inesperado!, ${err}`);
                            //         });
                            // }
                        })
                }
            });
    } catch (err) {
        return err;
    }
}


function converterParaFormatoISO(dataInput) {
  const [ano, mes, dia] = dataInput.split('-');
  const dataOriginal = new Date(Date.UTC(ano, mes - 1, dia));

  dataOriginal.setUTCHours(3, 0, 0, 0);

  const dataConvertida = dataOriginal.toISOString();

  return dataConvertida;
}