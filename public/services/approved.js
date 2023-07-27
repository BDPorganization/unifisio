window.addEventListener("load", () => {
    try {
        const matchingItems = {};
        let urlEmail = 'http://15.229.6.45:3002/codeTemplateMail';

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("uni")) {
                const value = localStorage.getItem(key);
                matchingItems[key] = JSON.parse(value);
            }
        }

        // Percorrer e mostrar as informações de cada objeto
        for (const key in matchingItems) {
            if (Object.hasOwnProperty.call(matchingItems, key)) {
                const value = matchingItems[key];

                let dataAtual = value.data_agendada;
                let name_user = value.nome_medico;
                let to = value.email_medico;
                let horarioAtual = JSON.parse(value.horarios);
                let pk_sala = value.pk_sala;

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

                        fetch('/deleteAllCart', {
                            method: "DELETE",
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((resultado) => {
                                if (resultado.excludeAllCart == true) {
                                    return resultado;
                                } else {
                                    alert("Erro ao remover itens do carrinho, tente novamente!");
                                    return;
                                }
                            });

                        // document.getElementById('hour').innerText = resultado.hora[0];
                        // document.getElementById('day').innerText = new Date(resultado.dia).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                        return resultado;
                    })
            }
        }

        //Enviando informações para o servidor do e-mail na AWS
        // fetch(urlEmail, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-access-token': token
        //     },
        //     body: JSON.stringify({
        //         name_user,
        //         to,
        //         idTemplate
        //     })
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((resultado) => {
        //         return resultado;
        //     })
    } catch (err) {
        return err;
    }
});