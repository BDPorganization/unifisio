const botao_avancar = document.getElementById("avancar");
const modalLogin = document.getElementById('loginModal');
const avancar1 = document.getElementById('formDadosPessoais');

botao_avancar.addEventListener("click", () => {
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] === true){
            fetch('/checarDados', {
                method: "POST"
            })
            .then((response) =>{
                return response.json();
            })
            .then((dados) => {
                exibirFormDados(dados);
            })
        }else {
            abrirModal(modalLogin);
        }
    })
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "flex";
}

function exibirFormDados(dados){
    var inputdate = document.getElementById('dateTime').value;

    if (inputdate == ''){
        alert('Escolha uma data para continuar');
    }else {
        if (dados.dados == true){
            let form = document.getElementById('formDadosPessoais');

            form.style.display = 'flex';
        }else {
            console.log('Você já preencheu seus dados! Deseja altera-los?');
        }
    }
}