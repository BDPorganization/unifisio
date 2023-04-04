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
        createCheckboxesFromJSON(resultado.datas);
    })
});


function createCheckboxesFromJSON(jsonData) {
    const container = document.getElementById('containerId');

    for (let i = 0; i < jsonData.length; i++) {
      const checkbox = document.createElement('input');
      const label = document.createElement('label');

      checkbox.type = 'checkbox';
      checkbox.name = jsonData[i].horario_disponivel;
      label.appendChild(document.createTextNode(jsonData[i].horario_disponivel));
      container.appendChild(checkbox);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    }
  }
  