var jogadores = []

// Botão para reiniciar

function reiniciarJogo() {
    jogadores = [];
    location.reload();
}

// Números aleatórios

function gerarNumerosAleatorios(quantidade, min, max) {

    if (quantidade > (max - min)) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min) + min);

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;

}

// Cartela

function gerarCartela() {
    var nomeJogador = prompt('Digite o nome do jogador');

    var cartela = [gerarNumerosAleatorios(5, 1, 15), gerarNumerosAleatorios(5, 16, 30), gerarNumerosAleatorios(5, 31, 45), gerarNumerosAleatorios(5, 46, 60), gerarNumerosAleatorios(5, 61, 75)]

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);

    console.log(jogadores)
}



// estrutura da tabela

function desenharCartela(nome, cartela) {
    var div = document.getElementById('cartelas');

    var nomeJogadorElemento = document.createElement('div');
    nomeJogadorElemento.innerText = nome;
    div.appendChild(nomeJogadorElemento);

    var tabela = document.createElement('table');

    var thead = document.createElement('thead');

    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';

    thead.appendChild(thB)
    thead.appendChild(thI)
    thead.appendChild(thN)
    thead.appendChild(thG)
    thead.appendChild(thO)

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (i == 2 && j == 2) {
                td.innerText = "X";
                tr.appendChild(td);
            } else {
                td.innerText = cartela[j][i]
                tr.appendChild(td);
            }
        }
        tabela.appendChild(tr)
    }

    tabela.appendChild(thead);
    div.appendChild(tabela);


}





// Botão iniciar o jogo


function verificarNumeros() {
    var numerosGerados = new Set();

    var divNumeros = document.getElementById('numeros');
    divNumeros.innerText = ""; // Limpa o conteúdo da seção "numeros"

    var divCartelas = document.getElementById('cartelas');
    var tabelas = divCartelas.getElementsByTagName('table');

    var interval = setInterval(function () {
        if (numerosGerados.size >= 75) {
            clearInterval(interval); // Interrompe a geração de números quando todos os números forem gerados
            return;
        }

        var numeroAleatorio;

        do {
            numeroAleatorio = Math.floor(Math.random() * 75) + 1;
        } while (numerosGerados.has(numeroAleatorio));

        numerosGerados.add(numeroAleatorio);

        divNumeros.innerText += numeroAleatorio + ", ";

        for (var i = 0; i < tabelas.length; i++) {
            var tabela = tabelas[i];
            var tdCells = tabela.getElementsByTagName('td');

            for (var j = 0; j < tdCells.length; j++) {
                var td = tdCells[j];
                var numeroCartela = parseInt(td.innerText);

                if (numeroCartela === numeroAleatorio) {
                    td.classList.add('celula'); // Adiciona uma classe CSS para pintar a célula da tabela
                }
            }
        }
    }, 200); // Gera um número a cada 0.5 segundos (500 milissegundos)

    // Remove a vírgula final dos números
    divNumeros.innerText = divNumeros.innerText.slice(0, -2);
}





