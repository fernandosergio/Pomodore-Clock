// elementos e arquivos utilizados
var audio = new Audio('done-for-you.mp3')

// Cronômetros
var trab = window.document.getElementById('trabalho')
var des = window.document.getElementById('descanso')

// Botões para alterar o <button disabled>
var bottocar = window.document.getElementById('botplay')
var botpause = window.document.getElementById('botpausar')

// Entrada de dados com formato de horas pra alteração do valor do cronômetro
var inpTrabSem = window.document.getElementById('inpTrab').value
var inpDesSem = window.document.getElementById('inpDes').value

// Marcadores para reiniciar a função
let conte = des
let tempofora = 5000
let verificador = false

//função que conta o tempo de trabalho
function conta(tempo, contador) {

    // "Iniciador" da função
    if (verificador) {

        // verficia se tem tempo
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
            contador.innerHTML = tempoimprimivel
            tempo-- // diminui 1 
            tempofora = tempo // define o tempo da variavel local para global
            conte = contador // define o contador atual da varivel local para global
            setTimeout('conta(tempofora, conte)', 1000) //espera o tempo

        } else {

            // quando acaba o tempo toca o audio e troca o contador
            audio.play()
            trocaCont()
        }
    }
    /*else {
           console.log('Deu erro no conta() ou foi pausado') // caso nenhum requisito foi atendido
       }*/
}

// Função que verifica os valores, troca os contadores e os valores
function trocaCont() {
    if (conte == trab && inpDesSem == '') {
        conta(300, des) // caso o contador esteja no trabalho e não foi definido o descanso
        document.getElementById('relogio').style.background = '#cecece'
        document.getElementById('relogio2').style.background = '#5ef08ee0'
    } else if (conte == trab) {
        conta(inpDes, des) // caso o contador esteja no trabalho e o valor de descanso foi definido
        document.getElementById('relogio').style.background = '#cecece'
        document.getElementById('relogio2').style.background = '#5ef08ee0'
    } else if (conte == des && inpTrabSem == '') {
        conta(1500, trab) // caso o contador esteja no descanso e o valor do trabalho não foi definido
        document.getElementById('relogio').style.background = '#5ef08ee0'
        document.getElementById('relogio2').style.background = '#cecece'
    } else if (conte == des) {
        conta(inpTrab, trab) // caso o contador esteja no descanso e o valor de descanso foi definido
        document.getElementById('relogio').style.background = '#5ef08ee0'
        document.getElementById('relogio2').style.background = '#cecece'
    }
    /*else {
           console.log('Faltou alguma/Deu erro no trocaCont()') // caso nenhum requisito foi atendido
       }*/
}

// valores do descanso e trabalho
let inpDes = ''
let inpTrab = ''

// inicia a função conta() ao clicar em play
function tocar() {

    // "inicia" a função conta()
    verificador = true

    // verfica se foi pausado, se os inputs foram setados e 
    if (conte == trab && tempofora != 5000) {
        conta(tempofora, trab) // caso o contador foi pausado e estava contando no trabalho
    } else if (conte == des && tempofora != 5000) {
        conta(tempofora, des) // caso o contador foi pausado e estava no descanso
    } else if (inpDesSem == '' && inpTrabSem == '') {
        conta(1500, trab) // vai iniciar a primeira vez caso esteja vazio
    } else if (inpTrabSem == '' && inpDesSem != '') {
        inpDes = altera(inpDesSem)
        conta(1500, trab) // caso o valor do descanso seja alterado
    } else if (inpTrabSem != '' && inpDesSem == '') {
        inpTrab = altera(inpTrabSem)
        conta(inpTrab, trab) // caso o valor de trabalho seja alterado
    } else if (inpTrabSem != '' && inpDesSem != '') {
        inpTrab = altera(inpTrabSem)
        inpDes = altera(inpDesSem)
        conta(inpTrab, trab) // caso os dois valores sejam alterados
    }
    /*else {
           console.log('Deu erro no tocar()') // caso nenhum requisito foi atendido
       }*/

    // Ativa o botão pause, desativa o botão play e os inputs
    bottocar.disabled = true
    botpausar.disabled = false
    window.document.getElementById('inpTrab').disabled = true
    window.document.getElementById('inpDes').disabled = true

}

// função do botão pause
function pausar() {

    // desativa o botão pause, ativa o botão play e os inputs
    bottocar.disabled = false
    botpausar.disabled = true
    verificador = false
    window.document.getElementById('inpTrab').disabled = false
    window.document.getElementById('inpDes').disabled = false
}

// função do botão stop
function para() {

    // redefine os valores, o estados dos botoes e inputs e a cor dos contadores
    tempofora = 5000
    verificador = false
    bottocar.disabled = false
    botpausar.disabled = true
    window.document.getElementById('inpTrab').disabled = false
    window.document.getElementById('inpDes').disabled = false
    document.getElementById('relogio').style.background = '#5ef08ee0'
    document.getElementById('relogio2').style.background = '#cecece'

    // verifica se os valores foram definidos, seta os valores e o html
    if (inpDesSem == '' && inpTrabSem == '') {
        inpTrab = 1500
        inpDes = 300
        trab.innerHTML = '25:00'
        des.innerHTML = '5:00'
    } else if (inpDesSem == '' && inpTrabSem != '') {
        inpTrab = altera(inpTrabSem)
        inpTrab = 300
        trab.innerHTML = inpTrabSem
        des.innerHTML = '5:00'
    } else if (inpTrabSem == '' && inpDesSem != '') {
        inpTrab = 1500
        inpSem = altera(inpDesSem)
        trab.innerHTML = '25:00'
        des.innerHTML = inpDesSem
    } else if (inpTrabSem != '' && inpDesSem != '') {
        inpTrab = altera(inpTrabSem)
        inpDes = altera(inpDesSem)
        trab.innerHTML = inpTrabSem
        des.innerHTML = inpDesSem
    }
    /* else {
           console.log('Deu erro no reinicia()') // caso nenhum requisito foi atendido
       }*/

}

// reinicia o contador
function reinicia() {

    // redefine os valores, o html dos contadores, o estado dos botoes e inputs e a cor dos contadores
    verificador = false
    tempofora = 5000
    trab.innerHTML = '25:00'
    des.innerHTML = '5:00'
    inpDesSem = ''
    inpTrabSem = ''
    window.document.getElementById('inpDes').value = ''
    window.document.getElementById('inpTrab').value = ''
    document.getElementById('relogio').style.background = '#5ef08ee0'
    document.getElementById('relogio2').style.background = '#cecece'
    bottocar.disabled = false
    botpausar.disabled = true
    window.document.getElementById('inpTrab').disabled = false
    window.document.getElementById('inpDes').disabled = false
}

// muda o valor do inpTrab e inpDes, atraves do form dinamicamente
function muda() {

    // pega os valores dos inputs e redefine o tempofora
    inpTrabSem = window.document.getElementById('inpTrab').value
    inpDesSem = window.document.getElementById('inpDes').value
    tempofora = 5000

    // verifica os valores digitados, muda o texto html e a cor dos contadores
    if (inpTrabSem == '') {
        inpTrab = 1500
    } else {
        inpTrab = inpTrabSem
        trab.innerHTML = inpTrabSem
    }
    if (inpDesSem == '') {
        inpDes = 300
    } else {
        inpDes = inpDesSem
        des.innerHTML = inpDesSem
    }
    document.getElementById('relogio').style.background = '#5ef08ee0'
    document.getElementById('relogio2').style.background = '#cecece'
}

// função que muda a formatação de horas para decimais
function altera(time) {
    const [minutos, segundos] = time.split(':')
    return Number((minutos * 60) + Number(segundos))
}

/* 
O que melhorar:
Refatorar as mudanças de cor do background
Refatorar as mudanças de estado dos botoes e inputs
*/