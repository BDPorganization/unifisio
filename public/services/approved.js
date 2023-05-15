window.addEventListener("load", ()=> {
    try {
        let dataAtual = localStorage.getItem("data");
        let horarioAtual = JSON.parse(localStorage.getItem("hora"));
        let pk_sala = localStorage.getItem("pk_sala");
    
        console.log(dataAtual, horarioAtual, pk_sala);
    
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
            console.log(resultado);
            return resultado;
        })
    } catch (err) {
        return err;
    }
});