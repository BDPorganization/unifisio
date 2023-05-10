window.addEventListener("load", () =>{
    fetch('/verificarLogin', {
        method: "GET"
    })
    .then((response) => {
        return response.json();
    })
    .then((resultado) => {
        if(resultado['autenticado'] == true){
            const linkLogin = document.getElementById('nomeUsuario');
            let nomeUser = resultado.nome.split(" ");

            if (nomeUser[0] == 'admin') {
                linkLogin.setAttribute('data-bs-target', '#adminModal');
                linkLogin.innerText = nomeUser[0];
            } else {
                linkLogin.setAttribute('data-bs-target', '#logadoModal');
                linkLogin.innerText = nomeUser[0];
            }
        }
    })
});