const botao_avancar = document.getElementById('avancar');
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
                if (dados.dados == true){
                    exibirFormDados();
                }
            })
        }else {
            abrirModal(modalLogin);
        }
    })
});

function abrirModal(element) {
    element.classList.add("show");
    element.style.display = "block";
}

function exibirFormDados(){
    var inputdate = document.getElementById('dateTime').value;

    if (inputdate == ''){
        alert('Escolha uma data para continuar');
    }else {
        let form = document.getElementById('formDadosPessoais');
        
        form.style.display = 'flex';
    }
}
