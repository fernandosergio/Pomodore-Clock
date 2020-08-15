// Arquivos utilizados
var audio = new Audio('done-for-you.mp3')

// Cronômetros
var trab = window.document.getElementById('trabalho')
var des = window.document.getElementById('descanso')

// Botões
var bottocar = window.document.getElementById('botplay')
var botpause = window.document.getElementById('botpausar')

// Entrada de dados com formato de horas pra alteração do valor do cronômetro
var inpTrabSem = window.document.getElementById('inpTrab').value
var inpDesSem = window.document.getElementById('inpDes').value

// Marcadores para reiniciar a função
let conte = des
let tempofora = 5000
let verificador = false

// Valores do descanso e trabalho
let inpDes = ''
let inpTrab = ''

// Função que conta o tempo dos cronometros
function conta(tempo, contador) {

    // "Iniciador" da função
    if (verificador) {

        // Verficia se tem tempo
        if (tempo >= 0) {
            // Divide o tempo entre minutos e segundos
            var min = parseInt(tempo / 60)
            var seg = tempo % 60

            // Se for menor do que 10 adiciona um 0 antes ex 09
            if (min < 10) {
                min = "0" + min
            }
            if (seg < 10) {
                seg = "0" + seg
            }

            // Formata o tempo
            tempoimprimivel = min + ":" + seg
            contador.innerHTML = tempoimprimivel
            tempo-- // Diminui 1 
            tempofora = tempo // Define o tempo da variavel local para global
            conte = contador // Define o contador atual da varivel local para global
            setTimeout('conta(tempofora, conte)', 1000) // Espera o tempo

        } else {

            // Quando acaba o tempo toca o audio e troca o contador
            audio.play()
            trocaCont()
        }
    }
    /*else {
           console.log('Deu erro no conta() ou foi pausado') // Caso nenhum requisito foi atendido
       }*/
}

// Função que verifica os valores, troca os contadores e os valores
function trocaCont() {
    if (conte == trab && inpDesSem == '') {
        conta(300, des) // Caso o contador esteja no trabalho e não foi definido o descanso
        eventos('desAtivado')
    } else if (conte == trab) {
        conta(inpDes, des) // Caso o contador esteja no trabalho e o valor de descanso foi definido
        eventos('desAtivado')
    } else if (conte == des && inpTrabSem == '') {
        conta(1500, trab) // Caso o contador esteja no descanso e o valor do trabalho não foi definido
        eventos('trabAtivado')
    } else if (conte == des) {
        conta(inpTrab, trab) // Caso o contador esteja no descanso e o valor de descanso foi definido
        eventos('trabAtivado')
    }
    /*else {
           console.log('Deu erro no trocaCont()') // Caso nenhum requisito foi atendido
       }*/
}

// Inicia a função conta() ao clicar em play
function tocar() {

    // continua a função conta()
    verificador = true

    // Verfica se foi pausado e se os inputs foram setados 
    if (conte == trab && tempofora != 5000) {
        conta(tempofora, trab) // Caso o contador foi pausado e estava contando no trabalho
    } else if (conte == des && tempofora != 5000) {
        conta(tempofora, des) // Caso o contador foi pausado e estava no descanso
    } else if (inpDesSem == '' && inpTrabSem == '') {
        conta(1500, trab) // Vai iniciar a primeira vez caso esteja vazio
    } else if (inpTrabSem == '' && inpDesSem != '') {
        inpDes = altera(inpDesSem)
        conta(1500, trab) // Caso o valor do descanso seja alterado
    } else if (inpTrabSem != '' && inpDesSem == '') {
        inpTrab = altera(inpTrabSem)
        conta(inpTrab, trab) // Caso o valor de trabalho seja alterado
    } else if (inpTrabSem != '' && inpDesSem != '') {
        inpTrab = altera(inpTrabSem)
        inpDes = altera(inpDesSem)
        conta(inpTrab, trab) // Caso os dois valores sejam alterados
    }
    /*else {
           console.log('Deu erro no tocar()') // Caso nenhum requisito foi atendido
       }*/

    eventos('clicaPlay')
}

// Função do botão pause
function pausar() {

    verificador = false
    eventos('clicaPause')
}

// Função do botão stop
function para() {

    // Redefine os valores 
    tempofora = 5000
    verificador = false
    eventos('clicaPause')
    eventos('trabAtivado')

    // Verifica se os valores foram definidos, seta os valores e o html
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
           console.log('Deu erro no reinicia()') // Caso nenhum requisito foi atendido
       }*/

}

// Reinicia o contador
function reinicia() {

    // Redefine os valores e o html dos contadores
    verificador = false
    tempofora = 5000
    trab.innerHTML = '25:00'
    des.innerHTML = '5:00'
    inpDesSem = ''
    inpTrabSem = ''
    window.document.getElementById('inpDes').value = ''
    window.document.getElementById('inpTrab').value = ''
    eventos('trabAtivado')
    eventos('clicaPause')
}

// Muda o valor do inpTrab e inpDes, atraves do form dinamicamente
function muda() {

    // Pega os valores dos inputs e redefine o tempofora
    inpTrabSem = window.document.getElementById('inpTrab').value
    inpDesSem = window.document.getElementById('inpDes').value
    tempofora = 5000

    // Verifica os valores digitados e muda o texto html 
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
    eventos('trabAtivado')
}

// Função que muda a formatação de horas para decimais
function altera(time) {
    const [minutos, segundos] = time.split(':')
    return Number((minutos * 60) + Number(segundos))
}

// Função pra mudar estado dos inputs e a cor dos cronometros
function eventos(caso) {

    switch (caso) {

        // Ativa botao pause, desativa o botao play e os inputs
        case 'clicaPlay':
            window.document.getElementById('inpTrab').disabled = true
            window.document.getElementById('inpDes').disabled = true
            bottocar.disabled = true
            botpause.disabled = false
            break;

            // Desativa o botao pause, ativa o botao play e os inputs 
        case 'clicaPause':
            window.document.getElementById('inpTrab').disabled = false
            window.document.getElementById('inpDes').disabled = false
            bottocar.disabled = false
            botpause.disabled = true
            break;

            // Inverte a cor dos cronometros
        case 'trabAtivado':
            document.getElementById('relogio').style.background = '#5ef08ee0'
            document.getElementById('relogio2').style.background = '#cecece'
            break;

            // Inverte a cor dos cronometros
        case 'desAtivado':
            document.getElementById('relogio').style.background = '#cecece'
            document.getElementById('relogio2').style.background = '#5ef08ee0'
            break;

        default:
            console.log('Deu erro no eventos()')
            break;
    }
}