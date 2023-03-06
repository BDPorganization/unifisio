const botao_avancar = document.getElementById("avancar1");
const modalLogin = document.getElementById('loginModal');
const avancar1 = document.getElementById('collapseExample2');
const codigo_medico = document.getElementById('codigo_medico');

botao_avancar.addEventListener("click", function() {
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        console.log(resultado['autenticado']);
        if(resultado['autenticado'] === true){
            avancar1.style.display = 'flex';
            codigo_medico.value = resultado['value'];
        }else{
            abrirModal(modalLogin);
        }
    })
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "flex";
}