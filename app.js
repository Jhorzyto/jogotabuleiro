var jogadores = [], jogadorAtual, regras = {};

function init() {
    jogadores.push({
        valor: '&#9820',
        nome: 'Jhordan',
        elementoAtual: document.getElementById('casa1')
    });

    jogadores.push({
        valor: '&#9821;',
        nome: 'Danilo',
        elementoAtual: document.getElementById('casa1')
    });

    vezDe(0, jogadores);
    vezDe(1, jogadores);

    jogadorAtual = jogadores[0];

    regras.casa2 = function (id, jogadores) {
        jogadores[id].elementoAtual.children[id].innerHTML = "";
        jogadores[id].elementoAtual = document.getElementById('casa4');
        vezDe(id, jogadores);
        alert("O Jogador " + jogadores[id].nome + " caiu na casa 2 e avançou 2 casas");
    };

    regras.casa5 = function (id, jogadores) {
        jogadorAtual = jogadores[id];
        jogadores[id].elementoAtual.children[id].innerHTML = "";
        jogadores[id].elementoAtual = document.getElementById('casa5');
        vezDe(id, jogadores);
        document.getElementById("vezDe").innerHTML = jogadores[id].valor;
        alert("O Jogador " + jogadores[id].nome + " caiu na casa 5 e deve jogar novamente");
    };

    regras.casa7 = function (id, jogadores) {
        var aux = [];
        aux[0]  = jogadores[0].elementoAtual;
        aux[1]  = jogadores[1].elementoAtual;

        jogadores[0].elementoAtual.children[0].innerHTML = "";
        jogadores[1].elementoAtual.children[1].innerHTML = "";

        jogadores[0].elementoAtual = aux[1];
        jogadores[1].elementoAtual = aux[0];

        vezDe(0, jogadores);
        vezDe(1, jogadores);

        document.getElementById("vezDe").innerHTML = jogadores[id == 0 ? 1 : 0].valor;
        alert("O Jogador " + jogadores[id].nome + " caiu na casa 7 e trocou de casa com o Jogador " + jogadores[id == 0 ? 1 : 0].nome);
    };

    regras.casa10 = function (id, jogadores) {
        jogadores[id].elementoAtual.children[id].innerHTML = "";
        jogadores[id].elementoAtual = document.getElementById('casa1');
        vezDe(id, jogadores);
        alert("O Jogador " + jogadores[id].nome + " caiu na casa 10 e retornou para o inicio!");
    };

    regras.casa11 = function (id, jogadores) {
        jogadores[id].elementoAtual.children[id].innerHTML = "";
        jogadores[id].elementoAtual = document.getElementById('casa11');
        vezDe(id, jogadores);
        alert("O Jogador " + jogadores[id].nome + " Venceu!");
    };
}

function vezDe(id, jogadores) {
    jogadores[id].elementoAtual.children[id].innerHTML = jogadores[id].valor;
    document.getElementById("vezDe").innerHTML = jogadores[id == 0 ? 1 : 0].valor;
}

function dado(){
    var valor = Math.floor(Math.random() * 5);
    var casaElemento = jogadorAtual.elementoAtual.id;
    var casaId = parseInt(casaElemento.replace(/[^0-9\.]/g, ''), 10);
    var idJogadorAtual = jogadores.indexOf(jogadorAtual);

    console.log(idJogadorAtual);
    console.log("casa" + (casaId + valor));

    document.getElementById("dado").innerHTML = valor;
    jogadorAtual = jogadores[idJogadorAtual == 0 ? 1 : 0];

    if(regras["casa" + (casaId + valor)] != undefined){
        return regras["casa" + (casaId + valor)](idJogadorAtual, jogadores);
    } else if((casaId + valor) >= 11) {
        return regras.casa11(idJogadorAtual, jogadores);
    } else {
        jogadores[idJogadorAtual].elementoAtual.children[idJogadorAtual].innerHTML = "";
        jogadores[idJogadorAtual].elementoAtual = document.getElementById("casa" + (casaId + valor));
        vezDe(idJogadorAtual, jogadores);
        alert("O Jogador " + jogadores[idJogadorAtual].nome + " avançou "+ valor +" casas,  Vez do Jogador " + jogadorAtual.nome);
    }
}

init();