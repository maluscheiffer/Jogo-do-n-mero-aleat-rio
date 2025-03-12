let listaDeNúmerosSorteados= [];
let númeroLimite = 10
let númeroSecreto = gerarNúmeroAleatório();
let tentativa = 1;
function exibirTextonaTela(tag,texto){
    let campo=document.querySelector(tag);
    campo.innerHTML= texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial() {
    exibirTextonaTela('h1','Jogo do número secreto');
    exibirTextonaTela('p',`Escolha um número de 1 a ${númeroLimite}`);
}
exibirMensagemInicial()
function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == númeroSecreto){
        let palavraTentativa= tentativa>1? "Tentativas":"Tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}`
        exibirTextonaTela('h1','Acertou');
        exibirTextonaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute>númeroSecreto){
            exibirTextonaTela('p','O número secreto é menor!');
        }else{
            exibirTextonaTela('p','O número secreto é maior');
        }
        tentativa++;    
        limparCampo()                                             
    }
}
function gerarNúmeroAleatório() {                                                                     
    let númeroEscolhido= parseInt(Math.random()*númeroLimite)+1;
    let quantidadeDeElementosNaLista = listaDeNúmerosSorteados.length;
    if(quantidadeDeElementosNaLista ==númeroLimite){
        listaDeNúmerosSorteados=[];
    }
    if(listaDeNúmerosSorteados.includes(númeroEscolhido)){
        return gerarNúmeroAleatório();
    }else{
        listaDeNúmerosSorteados.push(númeroEscolhido);
        console.log(listaDeNúmerosSorteados);
        return númeroEscolhido;
    }
    
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value='';
}
function reniciarJogo() {
    númeroSecreto=gerarNúmeroAleatório();
    limparCampo();
    tentativa=1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disable',true);
}