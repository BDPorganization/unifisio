const date = document.getElementById('dateTime');

date.addEventListener("change", function() {
    const dateNew = date.value;
    const sala = document.getElementById('pk_sala').value;

    console.log(dateNew, sala);

    fetch('/filtroData', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateNew, sala })
    })
    .then((resultado) => {
        console.log(resultado);
    })
});