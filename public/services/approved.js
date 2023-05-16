window.addEventListener("load", ()=> {
    try {
        let dataAtual = localStorage.getItem("data");
        let horarioAtual = JSON.parse(localStorage.getItem("hora"));
        let pk_sala = localStorage.getItem("pk_sala");
    
        fetch('/agendaDados', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataAtual, horarioAtual, pk_sala })
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            document.getElementById('hour').innerText = resultado.hora[0];
            document.getElementById('day').innerText = new Date(resultado.dia).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            return resultado;
        })
    } catch (err) {
        return err;
    }
});