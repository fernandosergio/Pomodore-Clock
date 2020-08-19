// Arquivos utilizados
var audio = new Audio('done-for-you.mp3')

// Cronômetros
var trab = window.document.getElementById('trabalho')
var des = window.document.getElementById('descanso')

// Botões
var bottocar = window.document.getElementById('botplay')
var botpause = window.document.getElementById('botpausar')

// Setas e divs pra manipulação
var trabText = window.document.getElementById('trabText')
var desText = window.document.getElementById('desText')
let valorTrab = trabText.innerText
let valorDes = desText.innerText

valorTrab = parseInt(valorTrab, 10)
valorDes = parseInt(valorDes, 10)
let trabMinutos = valorTrab
let desMinutos = valorDes

valorTrab = converter(valorTrab)
valorDes = converter(valorDes)

// Marcadores para reiniciar a função
let conte = des
let tempofora = 5000
let verificador = false

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
            setTimeout('conta(tempofora, conte)', 10) // Espera o tempo

        } else {

            // Quando acaba o tempo toca o audio e troca o contador
            audio.play()
            trocaCont()
        }
    } else {
        console.log('Deu erro no conta() ou foi pausado') // Caso nenhum requisito foi atendido
    }
}


// Função que verifica os valores, troca os contadores e os valores
function trocaCont() {

    if (conte == trab) {
        conta(valorDes, des) // Caso o contador esteja no trabalho e o valor de descanso foi definido
        eventos('desAtivado')
    } else if (conte == des) {
        conta(valorTrab, trab) // Caso o contador esteja no descanso e o valor de descanso foi definido
        eventos('trabAtivado')
    } else {
        console.log('Deu erro no trocaCont()') // Caso nenhum requisito foi atendido
    }
}

// Inicia a função conta() ao clicar em play
function tocar() {

    // continua a função conta()
    verificador = true
    if (conte == trab && tempofora != 5000) {
        conta(tempofora, trab) // Caso o contador foi pausado e estava contando no trabalho
    } else if (conte == des && tempofora != 5000) {
        conta(tempofora, des) // Caso o contador foi pausado e estava no descanso
    } else if (conte == trab) {
        conta(valorDes, des) // Caso o contador esteja no trabalho e o valor de descanso foi definido
        eventos('desAtivado')
    } else if (conte == des) {
        conta(valorTrab, trab) // Caso o contador esteja no descanso e o valor de descanso foi definido
        eventos('trabAtivado')
    }
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
    conte = des
    trab.innerHTML = trabText.innerText + ':00'
    des.innerHTML = desText.innerText + ':00'
    eventos('trabAtivado')
    eventos('clicaPause')
}

// Reinicia o contador
function reinicia() {

    // Redefine os valores e o html dos contadores
    verificador = false
    tempofora = 5000
    conte = des
    trab.innerHTML = '25:00'
    des.innerHTML = '5:00'
    trabText.innerText = 25
    desText.innerText = 5
    valorTrab = 1500
    valorDes = 300
    eventos('trabAtivado')
    eventos('clicaPause')

}

function flechas(caso) {

    switch (caso) {
        case 'setaCimaTrab':
            trabMinutos += 1
            valorTrab += 60
            trabText.innerText = trabMinutos
            trab.innerHTML = trabMinutos + ':00'
            break

        case 'setaBaixoTrab':
            trabMinutos -= 1
            valorTrab -= 60
            trabText.innerText = trabMinutos
            trab.innerHTML = trabMinutos + ':00'
            break

        case 'setaCimaDes':
            desMinutos += 1
            valorDes += 60
            desText.innerText = desMinutos
            des.innerHTML = desMinutos + ':00'
            break

        case 'setaBaixoDes':
            desMinutos -= 1
            valorDes -= 60
            desText.innerText = desMinutos
            des.innerHTML = desMinutos + ':00'
            break

        default:
            console.log('Deu erro no flechas()')
            break;
    }
}

// Função pra mudar estado dos inputs e a cor dos cronometros
function eventos(caso) {


    switch (caso) {

        // Ativa botao pause, desativa o botao play e os inputs
        case 'clicaPlay':
            bottocar.disabled = true
            botpause.disabled = false
            break;

            // Desativa o botao pause, ativa o botao play e os inputs 
        case 'clicaPause':
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

function converter(tempo) {
    return Number(tempo * 60)
}