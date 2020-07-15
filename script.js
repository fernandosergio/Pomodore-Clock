var audio = new Audio('done-for-you.mp3')
var trab = window.document.getElementById('trabalho')
var des = window.document.getElementById('descanso')
var pause = window.document.getElementById('play')
var parar = window.document.getElementById('para')
let tempo = 1500
let desmin = 300
var cont = false
var cond = false
var verifica = 0

//função que conta o tempo de trabalho
function conta() {
    //verifica se pode ser acionada e caso o para() foi acionado
    if (cont) {
        //Verifica a var tempo
        if (tempo >= 0) {
            //divide o tempo entre minutos e segundos
            var min = parseInt(tempo / 60)
            var seg = tempo % 60

            // se for menor do que 10 adiciona um 0 antes ex 09
            if (min < 10) {
                min = "0" + min
            }
            if (seg < 10) {
                seg = "0" + seg
            }
            // formata o tempo
            tempoimprimivel = min + ":" + seg
            trab.innerHTML = tempoimprimivel
            setTimeout('conta()', 1000) //espera o tempo
            tempo-- // diminui 1 
            verifica = 0 // seta verifica = 0 pra dizer que esta na conta()

        } else {
            // aciona a função conta, diz que é verdadeira e seta o tempo pra 300 e toca o audio
            audio.play()
            document.getElementById('relogio').style.background = '#cecece'
            document.getElementById('relogio2').style.background = '#5ef08ee0'
            desmin = 300
            cont = false
            cond = true
            contades()
        }
    }
}

// igual a conta() mas para o descanso
function contades() {
    // verifica se pode ser acionada e o para()
    if (cond) {
        if (desmin >= 0) {
            var min = parseInt(desmin / 60)
            var seg = desmin % 60

            if (min < 10) {
                min = "0" + min
            }
            if (seg < 10) {
                seg = "0" + seg
            }
            tempoimprimivel = min + ":" + seg
            des.innerHTML = tempoimprimivel
            setTimeout('contades()', 1000)
            desmin--
            verifica = 1
        } else {
            audio.play()
            document.getElementById('relogio').style.backgroundColor = '#5ef08ee0'
            document.getElementById('relogio2').style.backgroundColor = '#cecece'
            tempo = 1500
            cont = true
            cond = false
            conta()
        }
    }
}

// inicia as funções conta e contades
function chama() {
    // verifica qual está ativa no momento e aciona
    if (verifica == 0) {
        cont = true
        conta()
    } else {
        cond = 1
        contades()
    }
    // desativa botao play e ativa botão stop
    pause.disabled = true
    parar.disabled = false
}

// função do botão para 
function para() {
    cont = false
    cond = false
    play.disabled = false
    parar.disabled = true
}

// reinicia o contador
function reinicia() {
    des.innerHTML = "0:00"
    trab.innerHTML = "25:00"
    tempo = 1500
    desmin = 300
}
