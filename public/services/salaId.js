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

function exibirDatasFuturas() {
    var dataAtual = new Date();
    var inputDate = document.getElementById('dateTime');

    inputDate.min = dataAtual.toISOString().split('T')[0];
}