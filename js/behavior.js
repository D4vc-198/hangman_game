
//JUEGO VARIABLES
const listaPalabras = ['PERRO', 'GATO', 'SAPO', 'MOSCA', 'CABALLO', 'IGUANO', 'GALLO', 'GALLINA', 'ESCOBA'];
let palabra_censura = [];
let palabraAdivinar = [];
let letrasUsadas = [];
let respuesta = ``;
let max_intentos = 6;
let intentos = 0; //depende la imagen del valor de esta variable
let ref_letra = document.querySelector('#letra');
let ref_intentos = document.querySelector('#intentos');
let ref_resultado = document.querySelector('#resultado');
let ref_palabraCorrecta = document.querySelector("#correct_word");
var startDiv = document.getElementById("start-game");
var gameCanvas = document.getElementById("game-section");

//MODAL REFERENCIAS
var modal = document.getElementById("modal-config"); //obtenemos el modal
var btn = document.getElementById("btn-modal"); //obtenemos el boton
var span = document.getElementsByClassName("close")[0]; //obtenemos el boton para cerrar el modal
var modal_gameOver = document.getElementById("modal-gameOver");
var modal_winner = document.getElementById("modal-winner");

//MODAL 

//JUEGO FUNCIONES
function iniciarJuego(){
    let indiceAleatorio = Math.floor(Math.random() * listaPalabras.length); 
    let palabraAleatoria = listaPalabras[indiceAleatorio];
    respuesta = palabraAleatoria;
    palabraAdivinar = palabraAleatoria.split('');
    
    for(let letra of palabraAdivinar){
        palabra_censura.push('_');
    }
    remplazarTexto();
}

function remplazarTexto(){
    ref_resultado.textContent = palabra_censura.join(' ');
    ref_intentos.textContent = `Intentos restantes: ${max_intentos}`;
}

function inputUsuario(inputLetra, id){
    let letraUsuario = inputLetra;
    let idBtn = id;
    //encontramos la letra proporcionada por el usuario
    for(const[posicionLetra, letraAdivinar] of palabraAdivinar.entries()){
        if(letraUsuario == letraAdivinar){

            palabra_censura[posicionLetra] = letraAdivinar;

            document.getElementById(`${idBtn}`).disabled = true;
            letrasUsadas.push(idBtn);
        }
    }

    gameStatus(idBtn, letraUsuario);
    remplazarTexto();
}

function gameStatus(param_id, param_usr_letra){
    //GAME OVER
    if(!palabraAdivinar.includes(param_usr_letra)){
        intentos +=1;
        max_intentos -= 1;
        letraIncorrecta();
        
        document.getElementById(`${param_id}`).disabled = true;
        letrasUsadas.push(param_id);
        if(max_intentos == 0){
            console.log(respuesta);
            gameOver();
        }
    }

    //WINN
    if(!palabra_censura.includes('_')){
        winner();
    }
}

//Animacion letra Incorrecta
function letraIncorrecta(){
    //Eliminamos la clase con la animacion y la agregamos nuevamente
    //eso da el efecto de reiniciar cada que la palabra falle
    ref_intentos.classList.remove("intentoFallido");
    void ref_intentos.offsetWidth;
    ref_intentos.classList.add("intentoFallido");
    document.getElementById("imagen_ahorcado").src = "img/ahorcado_assets/intento_"+intentos+".png"; //Obtenemos el path y lo modificamos
}

function gameOver(){
    modal_gameOver.style.display = "block";
    ref_palabraCorrecta.textContent = `${respuesta}`;
}

function winner(){
    modal_winner.style.display = "block";
}


//MAIN MENU PLAY
function Play(){
    document.getElementById("imagen_ahorcado").src = "img/ahorcado_assets/intento_0.png"; 
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    iniciarJuego();
    reiniciar();
}


function reiniciar(){
    max_intentos = 6;
    intentos = 0;
    palabra_censura = [];
    ref_intentos.classList.remove("intentoFallido"); 
    //Comprobamos si hay id almacenado, de ser asi, las reactivamos
    if(letrasUsadas.length != 0){
        for(let i = 0; i <= letrasUsadas.length - 1; i++){
            document.getElementById(`${letrasUsadas[i]}`).disabled = false;
        }
    }

    let nuevo_indiceAleatorio = Math.floor(Math.random() * listaPalabras.length); 
    let nuevo_palabraAleatoria = listaPalabras[nuevo_indiceAleatorio];
    respuesta = nuevo_palabraAleatoria;
    palabraAdivinar = nuevo_palabraAleatoria.split('');
    
    for(let letra of palabraAdivinar){
        palabra_censura.push('_');
    }
    remplazarTexto();
}

function btn_home(){
    gameCanvas.style.display = "none";
    modal_gameOver.style.display ="none"
    modal_winner.style.display = "none";
    startDiv.style.display = "block";

}

function btn_reiniciar(){
    document.getElementById("imagen_ahorcado").src = "img/ahorcado_assets/intento_0.png"; 
    reiniciar();
    modal_gameOver.style.display = "none";
    modal_winner.style.display = "none";
}

//MODAL CONFIG
//al hacer click en el boton, el modal se abre
btn.onclick = function(){
    modal.style.display = "block";
}

//Al hacer click en el span, el modal se cierra
window.onclick = function(event){
    if(event.target == span){
        modal.style.display = "none";
    }
}
