const botao_avancar = document.getElementById("avancar1");
const modalLogin = document.getElementById('loginModal');

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
            console.log('exibir div');
        }else{
            abreModal()
            console.log('faça login');
        }
    })
});

function abreModal() {
    modalLogin.modal({
      show: true
    });
}