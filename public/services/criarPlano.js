const fragment = document.createDocumentFragment();
const container = document.getElementById('container');
var dadosPlanos = [];

window.addEventListener("load", () => {
    try {
        fetch('/checarPlanos', {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado) {
                    for (let i = 0; i < resultado.dados.length; i++) {
                        gerarCard(resultado.dados[i]);
                        dadosPlanos.push(resultado.dados[i]);
                    }
                    container.appendChild(fragment);
                } else {
                    appendAlert("Nenhum plano encontrado!", 'warning');
                    return;
                }
            })
    } catch (err) {
        return err;
    }
});

function onClickBtIncluirPlano() {
    var nomePlano = document.getElementById("nomePlano").value;
    var descricaoPlano = document.getElementById("descricaoPlano").value;
    var duracaoPlano = document.getElementById("duracaoPlano").value;
    var tipoPlano = document.getElementById("tipoPlano").value;
    var valor = document.getElementById("valorPlano").value;
    var valorPlano = valor.substring(3).replace(",", ".");

    try {
        fetch('/adcPlano', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomePlano, descricaoPlano, duracaoPlano, tipoPlano, valorPlano })
        })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.salvarPlano == true) {
                    location.reload();
                    return resultado;

                } else {
                    alert("Erro na inserção do plano, tente novamente mais tarde!");
                    return;
                }
            });
    } catch (err) {
        return err;
    }
};

function onClickBtEditarModal() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_plano = checkedCheckbox.value;
        let nome_plano = document.getElementById("nome");
        let descricao = document.getElementById("descricao");
        let duracaoDias = document.getElementById("duracaoDias");
        let tipo = document.getElementById("tipo");
        let valor = document.getElementById("valor");

        dadosPlanos.forEach((dado) => {
            if (dado.pk_planos == pk_plano) {
                nome_plano.value = dado.nome;
                descricao.value = dado.descricao;
                duracaoDias.value = dado.duracao_em_dias;
                tipo.value = dado.tipo;
                valor.value = parseFloat(dado.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            }
        });
    } catch (err) {
        alert("Nenhum plano selecionado!");
        return err;
    }
}

function onClickBtEditarPlano() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    var pk_plano = checkedCheckbox.value;
    var nome_plano = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var duracaoDias = document.getElementById("duracaoDias").value;
    let tipo = document.getElementById("tipo").value;
    var valor = document.getElementById("valor").value;
    var preco = valor.substring(3).replace(",", ".");
    
    try {
        fetch('/editarPlano', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pk_plano, nome_plano, descricao, duracaoDias, tipo, preco })
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            if (resultado.editarPlano == true) {
                location.reload();
            } else {
                alert("Erro na edição da sala, tente novamente mais tarde!");
                return;
            }
        });
    } catch (err) {
        return err;
    }
};

function onClickBtExcluirPlano() {
    try {
        let checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');
        let pk_plano = checkedCheckbox.value;

        if (pk_plano) {
            fetch('/excluirPlano', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pk_plano })
            })
            .then((response) => {
                return response.json();
            })
            .then((resultado) => {
                if (resultado.excluirPlano == true) {
                    location.reload();
                } else {
                    alert("Erro na exclusão do plano, tente novamente mais tarde!");
                    return;
                }
            });
        }
    } catch (err) {
        alert("Nenhum plano selecionado!");
        return err;
    }
};

function gerarCard(dados) {
    try {
        const card = document.createElement('div');
        const plano = document.createElement('h3');
        const tipo = document.createElement('p');
        const duracao_em_dias = document.createElement('p');
        const descricao = document.createElement('p');
        const valor = document.createElement('p');
        const checkboxWrapper = document.createElement('label');
        const checkbox = document.createElement('input');
        const checkmark = document.createElement('span');

        card.className = 'card';
        plano.textContent = dados.nome;
        tipo.textContent = `Tipo: ${dados.tipo}`;
        duracao_em_dias.textContent = `Duração em dias: ${dados.duracao_em_dias}`;
        descricao.textContent = `Descrição: ${dados.descricao}`;
        valor.textContent = `Preço do plano: ${dados.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        })}`;
        checkboxWrapper.className = 'checkbox-wrapper';
        checkbox.type = 'checkbox';
        checkbox.value = dados.pk_planos;
        checkmark.className = 'checkmark';

        card.appendChild(plano);
        card.appendChild(tipo);
        card.appendChild(duracao_em_dias);
        card.appendChild(descricao);
        card.appendChild(valor);
        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(checkmark);
        checkboxWrapper.appendChild(document.createTextNode('Selecione o plano'));
        card.appendChild(checkboxWrapper);
        fragment.appendChild(card);
    } catch (err) {
        return err;
    }
}

function formatarMoeda(params) {
    try {
        if (params === 0) {
            const valorInput = document.getElementById('valorPlano');
            const valorNumerico = parseFloat(valorInput.value.replace(/[^\d.-]/g, ''));
            const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        
            valorInput.value = valorFormatado;
        } else if (params === 1) {
            const valorInput = document.getElementById('valor');
            const valorNumerico = parseFloat(valorInput.value.replace(/[^\d.-]/g, ''));
            const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        
            valorInput.value = valorFormatado;
        }
    } catch (err) {
        return err;
    }
}
