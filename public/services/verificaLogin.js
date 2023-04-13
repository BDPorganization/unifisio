window.addEventListener("load", () =>{
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] == true){
            const linkLogin = document.getElementById('nomeUsuario');
            let nomeUser = resultado.nome.split(" ");
            
            linkLogin.setAttribute('data-bs-target', '#logadoModal');
            linkLogin.innerText = nomeUser[0];
        }
    })
});