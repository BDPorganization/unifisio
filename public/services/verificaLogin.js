window.addEventListener("load", () =>{
    fetch('/verificarLogin', {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] === true){
            const linkLogin = document.getElementById('nomeUsuario');
            // const dataBsTarget = linkLogin.dataset.bsTarget;
            
            linkLogin.setAttribute('data-bs-target', '#logadoModal');
            linkLogin.innerText = resultado.nome;
        }
    })
});