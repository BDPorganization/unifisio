const botao_avancar = document.getElementById("avancar1");

botao_avancar.addEventListener("click", function() {
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        console.log(resultado);
        if (resultado === true) {
            console.log('exibir div');
            // exibir div
        }else {
            console.log('abre modal login');
            // abre modal login
        }
    })
});