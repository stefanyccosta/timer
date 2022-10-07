const containerBtnEl = document.querySelector('.container-btn');
const buttonStart = document.querySelector(".btn");
const buttonStop = document.getElementById("parar")
const buttonClear = document.getElementById("limpar")
const horaEl = document.getElementById("hora");
const minutoEl = document.getElementById("minuto");
const segundoEl = document.getElementById("segundo");



function start() {
    const horas = parseInt(horaEl.value || 0);
    const minutos = parseInt(minutoEl.value || 0);
    const segundos = parseInt(segundoEl.value || 0);
    let tempo = tempoEmSegundos(horas, minutos, segundos);

    const audioEl = document.createElement("audio");
    audioEl.src = "./sons/timer.mp3";
    containerBtnEl.appendChild(audioEl);

    buttonStart.disabled = true;

    const timer = setInterval(() => {
        tempo = tempo - 1;
        atualizarTimer(tempo)
        // if (tempo == 0) {
        //     clearInterval(timer)
        //     buttonEl.disabled = false;
        // }
    }, 1000);

    const som = setTimeout(() => {
        audioEl.play();
        clearInterval(timer)
        buttonStart.disabled = false;
        buttonClear.disabled = true;
        buttonStop.disabled = true;
    }, tempo * 1000);


    buttonStop.addEventListener("click", () => {
        clearInterval(timer);
        clearTimeout(som);
        buttonStart.disabled = false
        buttonStop.disabled = true;
    })

    buttonClear.addEventListener("click", () => {
        clearInterval(timer);
        clearTimeout(som);
        atualizarTimer(0);
        buttonStop.disabled = true;
        buttonStart.disabled = false;
        
    })
buttonStop.disabled = false;
buttonClear.disabled = false;

}

function atualizarTimer(tempoTotal) {
    const display = transformaSegundoEmMinutoHora(tempoTotal);
    horaEl.value = formatarNumero(display.horas);
    minutoEl.value = formatarNumero(display.minutos);
    segundoEl.value = formatarNumero(display.segundos);
}


function tempoEmSegundos(horas, minutos, segundos) {
    let valorFinal = 0;
    const horasEmSegundos = horas * 60 * 60;
    const minutoEmSegundos = minutos * 60;
    valorFinal = horasEmSegundos + minutoEmSegundos + segundos;
    return valorFinal;
}

function transformaSegundoEmMinutoHora(tempoEmSegundos) {
    let horas = 0;
    let minutos = 0;
    while (tempoEmSegundos >= 3600) {
        tempoEmSegundos = tempoEmSegundos - 3600
        horas = horas + 1;
    }
    while (tempoEmSegundos >= 60) {
        tempoEmSegundos = tempoEmSegundos - 60
        minutos = minutos + 1;
    }
    return { horas, minutos, segundos: tempoEmSegundos }
}

function formatarNumero(numero) {
    if (numero < 10) {
        return "0" + numero;

    }
    return numero;

}











// Usando operador módulo (%) e função de arredondamento para baixo (Math.floor)
// function transformaSegundosEmHMS(tempoEmSegundos) {
//     const horas = Math.floor(tempoEmSegundos / 3600);
//     let resto = tempoEmSegundos % 3600;
//     const minutos = Math.floor(resto / 60);
//     resto = resto % 60;
//     return { horas, minutos, segundos: resto }
// }

