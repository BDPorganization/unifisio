window.addEventListener("load", ()=> {
    try {
        let dataAtual = localStorage.getItem("data");
        let name_sala = localStorage.getItem("name_sala");
        let preco = localStorage.getItem("preco_sala");
        let preco_sala = preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
        let email_user = localStorage.getItem("email_user");
        let name_user = localStorage.getItem("name_user");
        let to = localStorage.getItem("email_user");
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
            let token = resultado.token;
            let idTemplate = resultado.idTemplate;
            let data_formatada = new Date(dataAtual).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            let horario_formatado = resultado.hora[0];

            document.getElementById('hour').innerText = resultado.hora[0];
            document.getElementById('day').innerText = new Date(resultado.dia).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            
            fetch('https://codemail.onrender.com/codeTemplateMail', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ 
                    data_formatada, 
                    horario_formatado, 
                    name_sala,
                    name_user, 
                    email_user, 
                    to, 
                    idTemplate
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                return resultado;
            })
        })
    } catch (err) {
        return err;
    }
});