let listaDeAmigos = [];
let paresSorteados = {};

function adicionarAmigo() {
    let amigo = document.getElementById('amigo').value;
    
    if (amigo.trim() === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }
    
    amigo = amigo.trim().toLowerCase(); 
    if (listaDeAmigos.includes(amigo)) {
        alert('Este nome já foi adicionado.');
        return;
    }
    
    listaDeAmigos.push(amigo);
    document.getElementById('amigo').value = '';
    
    if (document.getElementById('reiniciarButton').classList.contains('hidden') === false) {
        reiniciar();
    }
    
    exibirListaDeAmigos();
}

function exibirListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    for (let i = 0; i < listaDeAmigos.length; i++) {
        let li = document.createElement('li');
        li.textContent = listaDeAmigos[i];
        li.classList.add('name-list-item');
        
        let button = document.createElement('button');
        button.textContent = 'x';
        button.classList.add('button-delete');
        button.onclick = function() {
            excluirAmigo(listaDeAmigos[i]);
        };
        
        li.appendChild(button);
        lista.appendChild(li);

        setTimeout(() => {
            li.classList.add('is-visible');
        }, 10);
    }
}

function excluirAmigo(amigoParaExcluir) {
    let index = listaDeAmigos.indexOf(amigoParaExcluir);
    if (index > -1) {
        listaDeAmigos.splice(index, 1);
    }
    
    exibirListaDeAmigos();
}

// Esta função inicia o sorteio, escondendo a lista e mostrando o campo de nome
function iniciarSorteio() {
    if (listaDeAmigos.length < 3) {
        alert("O sorteio precisa de no mínimo 3 pessoas para acontecer.");
        return;
    }
    
    if (Object.keys(paresSorteados).length === 0) {
        realizarSorteioCompleto();
    }
    
    // Esconde a lista de nomes e mostra a seção de sorteio
    document.getElementById('sortearButton').classList.add('hidden');
    document.getElementById('sorteioSection').classList.remove('hidden-section');
    document.getElementById('resultado').innerHTML = '';
}

// Esta função contém a lógica do sorteio individual
function realizarSorteio() {
    let quemEstaSorteando = document.getElementById('sorteador').value.trim().toLowerCase();

    if (!listaDeAmigos.includes(quemEstaSorteando)) {
        alert("Nome não encontrado. Por favor, digite seu nome exatamente como o adicionou.");
        return;
    }

    if (!paresSorteados[quemEstaSorteando]) {
        alert("Você já sorteou seu amigo secreto.");
        return;
    }

    let amigoSecreto = paresSorteados[quemEstaSorteando];
    document.getElementById('resultado').innerHTML = `${quemEstaSorteando} tirou ${amigoSecreto}!`;
    
    delete paresSorteados[quemEstaSorteando];
    document.getElementById('sorteador').value = '';

    // Se a última pessoa foi sorteada, esconde o campo e mostra o botão "Finalizar"
    if (Object.keys(paresSorteados).length === 0) {
        document.getElementById('sorteioSection').classList.add('hidden-section');
        
        // Altera o texto do botão "Sortear amigo" para "Finalizar Sorteio"
        let sortearButton = document.getElementById('sortearButton');
        sortearButton.textContent = 'Finalizar Sorteio';
        sortearButton.classList.remove('hidden');
        
        // Altera o onclick do botão para a função que finaliza
        sortearButton.onclick = finalizarSorteio;
    }
}

function realizarSorteioCompleto() {
    let listaEmbaralhada = [...listaDeAmigos];
    listaEmbaralhada.sort(() => Math.random() - 0.5);

    paresSorteados = {};
    for (let i = 0; i < listaEmbaralhada.length; i++) {
        let sorteado = listaEmbaralhada[i === listaEmbaralhada.length - 1 ? 0 : i + 1];
        paresSorteados[listaEmbaralhada[i]] = sorteado;
    }
}

// Esta função lida com o clique final do sorteio
function finalizarSorteio() {
    document.getElementById('resultado').innerHTML = "Todos os nomes foram sorteados! Aperte o botão 'Reiniciar' para fazer um novo sorteio.";
    document.getElementById('sortearButton').classList.add('hidden');
    document.getElementById('reiniciarButton').classList.remove('hidden');
}

function reiniciar() {
    listaDeAmigos = [];
    paresSorteados = {};
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';

    document.getElementById('sortearButton').classList.remove('hidden');
    document.getElementById('reiniciarButton').classList.add('hidden');
    document.getElementById('sorteioSection').classList.add('hidden-section');
    
    // Restaura o onclick e o texto do botão Sortear
    let sortearButton = document.getElementById('sortearButton');
    sortearButton.textContent = 'Sortear amigo';
    sortearButton.onclick = iniciarSorteio;
}