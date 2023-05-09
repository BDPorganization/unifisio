// Login
const formLogin = document.getElementById('form-login');

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailLogin = formData.get('emailLogin');
    const senhaLogin = formData.get('senhaLogin');

    try {
        fetch('/loginDB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailLogin, senhaLogin })
        });
    }catch(err) {
        return err
    }
});

// Cadastro
const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailCadastro = formData.get('emailCadastro');
    const senhaCadastro = formData.get('senhaCadastro');
    const especialidade = formData.get('especialidade');
    const nomeCompleto = formData.get('nomeCompleto');
    const confSenha = formData.get('confSenha');

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailCadastro, senhaCadastro, especialidade, nomeCompleto, confSenha })
        });

        response.status == 201 ? location.reload() :
        response.status == 409 ? alert("As senhas não coincidem!") :
        response.status == 302 ? alert("Usuário já cadastrado!") : 
        alert("Ocorreu um erro no cadastro, por favor tente mais tarde!")
    }catch(err) {
        return err
    }
});

// Apagar conta form-apagarConta
// const formApagarConta = document.getElementById('form-apagarConta');

// formCadastro.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     try {
//         if (senhaCadastro == confSenha) {
//             const response = await fetch('/apagar', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ emailCadastro, senhaCadastro, especialidade, nomeCompleto })
//             });
    
//             if (response.status == 201) {
//                 location.reload();
//             }
    
//             else if (response.status == 404) {
//                 alert("Usuário já cadastrado!");
//             }
    
//             else if (response.status == 400 || response.status == 500) {
//                 alert("Ocorreu um erro no cadastro, por favor tente mais tarde!");
//             }
//         }else {
//             alert("As senhas não coincidem!")
//         }
//     }catch(err) {
//         return err
//     }
// });