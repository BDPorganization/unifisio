window.addEventListener("load", ()=> {
    try {
        fetch('/checarSalas', {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            for (let i = 0; i < resultado.dados.length; i++) {
                gerarCard(resultado.dados[i]);
            }
        })
    } catch (err) {
        return err;
    }
});

function gerarCard(dados) {
    const card = document.createElement('div');
    const card_img = document.createElement('div');
    const imgUrl = document.createElement('img');
    const div_texto = document.createElement('div');
    const sala = document.createElement('h5');
    const descricao = document.createElement('p');
    const hr = document.createElement('hr');
    const div_link = document.createElement('div');
    const a = document.createElement('a');

    const container = document.getElementById('div-interna-cards'); 

    card.className = 'card-salas';
    card_img.className = 'card-imgs';
    imgUrl.src = `/uploads/${dados.imgurl}`;
    div_texto.className = 'text-center';
    sala.textContent = dados.nome;
    descricao.textContent = dados.descricao; 
    hr.style.color = '#000';
    div_link.className = 'div-link';
    a.textContent = 'Saber mais'
    a.href = '#'

    

    card.appendChild(card_img);
    card_img.appendChild(imgUrl);
    card.appendChild(div_texto);
    div_texto.appendChild(sala);
    div_texto.appendChild(descricao);
    card.appendChild(hr);
    card.appendChild(div_link);
    div_link.appendChild(a);
    container.appendChild(card);
}