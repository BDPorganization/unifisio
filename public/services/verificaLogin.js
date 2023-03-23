window.addEventListener("load", () =>{
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] === true){
            document.getElementById('nomeUsuario').innerText = resultado.nome;
        }else {
            return Error('Erro ao carregar nome do usuário!');
        }
    })
});