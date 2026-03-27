let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Digite um número entre 1 e 100.');
    document.getElementById('botaoChute').removeAttribute('disabled');
    console.log(numeroSecreto)
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(`Você escolheu ${chute}`);
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Parabéns');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        msgAcertou = `Você acertou com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p',msgAcertou);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('botaoChute').setAttribute('disabled',true);
    } else {
        tentativas++;
        console.log(tentativas);
        if (chute > numeroSecreto){
            let dicaMenor = `DICA: O número secreto é MENOR que: ${chute}`;
            exibirTextoNaTela('p',dicaMenor);
        } else {
            let dicaMaior = `DICA: O número secreto é MAIOR que: ${chute}`;
            exibirTextoNaTela('p',dicaMaior);
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite ) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);

}