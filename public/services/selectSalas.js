const date = document.getElementById('dateTime');

date.addEventListener("change", function() {
    try {
        const dateNew = date.value;
        const sala = document.getElementById('pk_sala').value;
    
        fetch('/filtroData', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dateNew, sala })
        })
        .then((response) => {
            if (response.status == 204) {
                appendAlert("Nenhum horário encontrado para o dia selecionado!", 'warning');
                return false;
            }
            return response.json();
        })
        .then((resultado) => {
            createCheckboxesFromJSON(resultado.datas);
        });
    } catch (err) {
        return err;
    }
});

function createCheckboxesFromJSON(jsonData) {
    try {
        const container = document.getElementById('containerId');
        const p = document.getElementById('label-hora');
      
        container.innerHTML = '';
        p.innerHTML = 'Selecione seu horário:';
        for (let i = 0; i < jsonData.length; i++) {
            const checkbox = document.createElement('input');
            const label = document.createElement('label');
            const span = document.createElement('span');
            let horarios = jsonData[i].horario_disponivel;
            let partes = horarios.split(':');
            let horas = parseInt(partes[0], 10);
            let minutos = parseInt(partes[1], 10);
            let horaFormatada = horas < 10 ? "0" + horas : horas;
            let minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
            let horaFinal = `${horaFormatada}:${minutosFormatados}`;
    
            checkbox.type = 'checkbox';
            checkbox.name = horaFinal;
            label.appendChild(document.createTextNode(horaFinal));
            label.style.margin = '3px';
            label.classList.add("checkbox-card");
            span.classList.add("checkmark");
            container.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(span)
        }
    } catch (err) {
        return err;
    }
}