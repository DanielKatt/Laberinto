//Variable del lienzo
let canvas;
//Variable del conexto
let ctx;
//FPS
const FPS = 50;

//Ancho de la ficha
let anchoF = 50;
let altoF = 50;

//Tipo de ficha
let pasto = "green";
let agua = "blue";
let tierra = "brown"
let fuego = "red"

//Escenario Array - Matriz
let escenario = [
    [3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1], //Posición 0
    [2,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1], //1
    [2,1,0,1,0,1,0,1,0,0,0,1,1,1,0,1], // 2
    [3,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1], // 3
    [3,0,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
    [3,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
    [3,3,0,1,1,1,1,1,0,1,0,1,0,0,0,1],
    [3,3,0,0,0,1,0,0,0,1,0,1,1,1,0,1],
    [3,3,3,3,0,1,0,1,1,1,0,0,0,1,0,1],
    [3,3,0,3,0,1,0,1,0,1,1,1,0,1,0,1],
    [3,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1],
    [3,1,1,1,1,1,0,1,0,1,2,0,0,0,0,1],
    [3,0,0,0,0,0,0,1,0,1,2,2,1,1,0,1],
    [3,0,0,1,1,1,1,1,0,1,2,2,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1],
]

//Construir escenario
function dibujarEscenario(){
    let color;
    //Recorror el alto del escenario
    for(y = 0; y < escenario.length; y++){
        //Recorrer el ancho del escenario
        for(x = 0; x < escenario[y].length; x++){
            //Compara para reemplazar la ficha
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if(escenario[y][x] == 1){
                color = agua;
            }
            if(escenario[y][x] == 2){
                color = tierra;
            }
            if(escenario[y][x] == 3){
                color = fuego;
            }
            ctx.fillStyle = color
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
        }
    }
}
let jugador = function(){
    //Atributo clase
    this.x = 1;
    this.y = 1;
    this.color = "black"

    this.dibuja = function(){
        ctx.fillStyle  = this.color;
        ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF, altoF)
    }

    this.arriba = function() {
        if(this.margenes(this.x,this.y-1) == false){ 
        this.y--
    }
    }
    this.abajo = function() {
        if(this.margenes(this.x,this.y+1) == false){ 
        this.y++
    }
    }

    this.izquierda = function() {
        if(this.margenes(this.x-1,this.y) == false){ 
        this.x--
    }
    }

    this.derecha = function() {
        if(this.margenes(this.x+1,this.y) == false){ 
        this.x++
    }
    }

    this.margenes = function(x,y){
        let colisiones = false
        if(escenario[x][y] == 3){
            colisiones = true
        }
        return(colisiones)
    }
}

//variable global
let protagonista;

//Esta funcion activa todo 
function inicializa(){
    canvas = document.getElementById("canva")
    ctx = canvas.getContext("2d")

    //Creo el jugador
    protagonista = new jugador()

    //lectura de teclado
    document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode == 38){
            protagonista.arriba()
        }

        else if(tecla.keyCode == 40){
            protagonista.abajo()
        }
        
        else if(tecla.keyCode == 37){
            protagonista.izquierda()
        }

        else if(tecla.keyCode == 39){
            protagonista.derecha()
        }

    })

    setInterval(function(){
        principal()
    },1000/FPS)

}

//Esta función centraliza las demas funciones
function principal(){

    dibujarEscenario()
    protagonista.dibuja()

}
