const inputDate = document.getElementById('dateTime');
var datas_bloqueadas = [];
var datas_planos = [];

window.addEventListener("load", ()=> {
    try {
        const idSala = document.getElementById("idSala").value;

        fetch('/selectSalas', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSala })
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            const span = document.createElement('span');

            datas_bloqueadas = resultado.dias;
            datas_planos = resultado.dias_planos;
            document.getElementById("unit-price").value = resultado.dados[0].valor;
            document.getElementById("descricao_longa").innerHTML = resultado.dados[0].descricao_longa;
            document.getElementById("preco").innerHTML = `${resultado.dados[0].valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
            })}`;
            span.style = "font-weight: 100; font-size: 14px; text-shadow: none;";
            span.textContent = "p/hora";
            document.getElementById("preco").appendChild(span);
            document.getElementById("product-description").innerHTML = resultado.dados[0].nome;
            document.getElementById("imgUrl").src = `/uploads/${resultado.dados[0].imgurl}`;
            document.getElementById("display").style.display = "";
            exibirDatasFuturas();
        })
    } catch (err) {
        return err;
    }
});

inputDate.addEventListener('change', bloquearDiaEspecifico);

function exibirDatasFuturas() {
    var dataAtual = new Date();

    inputDate.min = dataAtual.toISOString().split('T')[0];
}

function bloquearDiaEspecifico() {
    var dataSelecionada = new Date(inputDate.value);
    var div_main =  document.getElementById("div-main");

    if (datas_bloqueadas) {
        for (let i = 0; i < datas_bloqueadas.length; i++) {
            let diaBloqueado = new Date(datas_bloqueadas[i].dias);
    
            if (dataSelecionada.toISOString().split('T')[0] === diaBloqueado.toISOString().split('T')[0]) {
                inputDate.value = "";
                appendAlert("O dia selecionado está indisponível!", 'danger');
                div_main.style.display = "none";
                document.getElementById("adcCart").style.display = "none";
                return;
            } else {
                div_main.style.display = "";
                document.getElementById("adcCart").style.display = "";
            }
        }
    }

    if (datas_planos) {
        for (let i = 0; i < datas_planos.length; i++) {
            let diaPlanos = new Date(datas_planos[i].datas);
            let diaPlanosPkSala = datas_planos[i].fk_salas_pk_salas;
            let salaAlugadaPlano = document.getElementById("pk_sala").value;
            
            if (dataSelecionada.toISOString().split('T')[0] === diaPlanos.toISOString().split('T')[0] && salaAlugadaPlano == diaPlanosPkSala) {
                inputDate.value = "";
                appendAlert("O dia selecionado está indisponível!", 'warning');
                div_main.style.display = "none";
                document.getElementById("adcCart").style.display = "none";
                return;
            } else {
                div_main.style.display = "";
                document.getElementById("adcCart").style.display = "";
            }
        }
    }
}