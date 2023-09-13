window.addEventListener("load", async () => {
    try {
        const matchingItems = {};
        let name_user;
        let to;
        let token;
        let idTemplate;

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
                let dataFim = value.data_agendada_fim;
                let horarioAtual = value.horarios == "0" ? "00:00" : value.horarios;
                let pk_sala = value.pk_sala;
                let id = value.pk_cart;
                name_user = value.nome_medico;
                to = value.email_medico;

                try {
                    const response = await fetch('/agendaDados', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ dataAtual, dataFim, horarioAtual, pk_sala })
                    });

                    const resultado = await response.json();

                    if (resultado.agendado !== true) {
                        alert("Erro ao agendar a(s) sala(s), favor entrar em contato com o administrador!");
                    }

                    token = resultado.token;
                    idTemplate = resultado.idTemplate;

                    try {
                        const deleteResponse = await fetch('/deleteItemCart', {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id })
                        });
                    } catch (err) {
                        alert(`Ocorreu um erro inesperado!, ${err}`);
                        return err;
                    }
                } catch (err) {
                    alert(`Ocorreu um erro inesperado!, ${err}`);
                    return err;
                }
            }
        }
        await enviaEmail(name_user, to, idTemplate, token);
        await downloadContrato();
        verificaCart();
        localStorage.clear();
    } catch (err) {
        alert(`Ocorreu um erro inesperado!, ${err}`);
        return err;
    }
});

//Envia as informações para o servidor do e-mail
async function enviaEmail(name_user, to, idTemplate, token) {
    const urlEmail = 'https://codemail.onrender.com/codeTemplateMail';

    fetch(urlEmail, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            name_user,
            to,
            idTemplate
        })
    })
    .then((response) => {
        if (response.ok) {
            return response;
        } else {
            appendAlert("Ocorreu uma falha no envio do e-mail, favor entrar em contato com o administrador", "danger");
        }
    })
    .catch((err) => {
        return err;
    });
}

async function downloadContrato() {
    const contrato = await fetch('/download', {
        method: "GET",
    });

    return contrato;
}