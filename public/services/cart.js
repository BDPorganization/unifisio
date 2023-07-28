window.addEventListener("load", () => {
  try {
    fetch('/listCart', {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 401) {
          alert("Faça login para visualizar os produtos no carrinho!");
        }
      })
      .then((resultado) => {
        if (resultado) {
          construirTabela(resultado.itens);
          calcTotal(resultado.itens);
        }
      })
  } catch (err) {
    return err;
  }
});

function construirTabela(dadosDoBanco) {
  const tabela = document.getElementById('tabela-produtos');
  const tbody = tabela.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';

  dadosDoBanco.forEach(dado => {
    const row = document.createElement('tr');

    row.innerHTML = `
          <td>${dado.nome}</td>
          <td>${dado.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
          })}
          </td>
          <td>${new Date (dado.data_agendada).toLocaleDateString('pt-BR')}</td>
          <td>${dado.horarios}</td>
          <td onclick="onClickBtExcluirItens(${dado.pk_cart})"><i class="fa-solid fa-trash"></i></td>
      `;
    tbody.appendChild(row);
  });
}

function calcTotal(params) {
  var total = 0;

  for (let i = 0; i < params.length; i++) {
    const element = params[i].valor;

    total += element;
  }

  document.getElementById("valor_total").value = total;
  document.getElementById("total").innerHTML = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  });
  return total;
}

function onClickBtExcluirAllItens() {
  try {
    fetch('/deleteAllCart', {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        if (resultado.excludeAllCart == true) {
          location.reload();
        } else {
          alert("Erro ao remover itens do carrinho, tente novamente!");
          return;
        }
      });
  } catch (err) {
    return err;
  }
};

function onClickBtExcluirItens(id) {
  try {
    fetch('/deleteItemCart', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        if (resultado.excludeItemCart == true) {
          location.reload();
        } else {
          alert("Erro ao remover itens do carrinho, tente novamente!");
          return;
        }
      });
  } catch (err) {
    return err;
  }
};
