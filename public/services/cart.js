window.addEventListener("load", () => {
  try {
    fetch('/listCart', {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 401) {
          appendAlert("Faça login para visualizar os produtos no carrinho!", 'warning');
          return false;
        }
      })
      .then((resultado) => {
        if (resultado) {
          construirTabela(resultado.itens);
          calcTotal(resultado.itens);
        } else if (resultado == undefined) {
          appendAlert("Adicione produtos para visualizar seu carrinho!", 'warning');
        }
      });
  } catch (err) {
    return err;
  }
});

function construirTabela(dadosDoBanco) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  dadosDoBanco.forEach(dado => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const h5 = document.createElement("h5");

    h5.textContent = dado.nome;

    const div = document.createElement("div");
    div.classList.add("d-flex", "flex-wrap", "w-100");

    const p1 = document.createElement("p");

    p1.style.paddingTop = "5px";
    p1.textContent = "Horário:";

    const p2 = document.createElement("p");

    p2.style.borderRadius = "5px";
    p2.style.backgroundColor = "#F3F3F3";
    p2.style.padding = "3px";
    p2.style.margin = "5px";
    p2.textContent = dado.horarios == "0" ? "De acordo com o plano" : dado.horarios;

    div.appendChild(p1);
    div.appendChild(p2);

    td1.appendChild(h5);
    td1.appendChild(div);

    const td2 = document.createElement("td");

    td2.style.width = "15%";
    td2.style.padding = "40px 0px";
    td2.style.textAlign = "center";
    td2.textContent = `${new Date(dado.data_agendada).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} ${dado.data_agendada_fim !== null ? ' - ' + new Date(dado.data_agendada_fim).toLocaleDateString('pt-BR') : ""}`;

    const td3 = document.createElement("td");

    td3.style.width = "15%";
    td3.style.padding = "40px 0px";
    td3.style.textAlign = "center";
    td3.textContent = dado.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });

    const td4 = document.createElement("td");
    const icon = document.createElement("i");

    td4.style.width = "10%";
    td4.style.padding = "40px 0px";
    td4.style.textAlign = "center";
    td4.onclick = () => {
      onClickBtExcluirItens(dado.pk_cart);
    };
    icon.classList.add("fa", "fa-trash-can");
    td4.appendChild(icon);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbody.appendChild(tr);
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
          appendAlert("Erro ao remover itens do carrinho, tente novamente!", 'danger');
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
          appendAlert("Erro ao remover itens do carrinho, tente novamente!", 'danger');
          return;
        }
      });
  } catch (err) {
    return err;
  }
};
