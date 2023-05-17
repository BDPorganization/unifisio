const date = document.getElementById('dateTime');

date.addEventListener("change", function() {
    const dateNew = date.value;
    const sala = document.getElementById('pk_sala').value;

    fetch('/filtroData', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateNew, sala })
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if (resultado.datas == false) {
            console.log('Nenhum horário encontrado para o dia selecionado');
        }
        createCheckboxesFromJSON(resultado.datas);
    })
});


function createCheckboxesFromJSON(jsonData) {
    const container = document.getElementById('containerId');
    const p = document.getElementById('label-hora');
  
    container.innerHTML = '';
    p.innerHTML = 'Selecione seu horário:';
    for (let i = 0; i < jsonData.length; i++) {
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const span = document.createElement('span');
  
      checkbox.type = 'checkbox';
      checkbox.name = jsonData[i].horario_disponivel;
      label.appendChild(document.createTextNode(jsonData[i].horario_disponivel));
      label.style.margin = '3px';
      label.classList.add("checkbox-card");
      span.classList.add("checkmark");
      container.appendChild(label);
      label.appendChild(checkbox);
      label.appendChild(span)
    }
}