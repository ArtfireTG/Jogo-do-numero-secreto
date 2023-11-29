let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Bem vindo ao jogo do número secreto!");
    exibirTextoNaTela("p", "Escolha um numero de 1 a " + numeroLimite + ".");
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(numeroAleatorio == chute){
        exibirTextoNaTela("h1", "Acertou");
        let palavraTentativas = tentativas > 1 ? " tentativas!" : " tentativa!";
        let mensagemTentativas = "Você descobriu o número secreto com " + tentativas + palavraTentativas;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else{
        if(numeroAleatorio > chute){
            exibirTextoNaTela("p", "O número secreto é maior");
        } else{
            exibirTextoNaTela("p", "O número secreto é menor");
        }
        tentativas++;
        function limparCampo(){
            chute = document.querySelector("input");
            chute.value = "";
        }
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

console.log(numeroAleatorio);

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}