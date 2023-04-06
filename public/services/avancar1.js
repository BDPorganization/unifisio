const botao_avancar = document.getElementById("avancar");
const modalLogin = document.getElementById('loginModal');
const avancar1 = document.getElementById('formDadosPessoais');

botao_avancar.addEventListener("click", function() {
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] === true){
            avancar1.style.display = 'flex';
        }else {
            abrirModal(modalLogin);
        }
    })
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "flex";
}