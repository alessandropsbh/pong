//variaveis Bolinha
let xBolinha = 305;
let yBolinha = 200;
let diametro = 15;
let centroBolinha = diametro/2;

//variaveis velocidade raquete
let yRaqueteD = 160;
let yRaqueteE = 160;
let xRaqueteD = 580;
let xRaqueteE = 10;
let alturaRaquete = 70;
let comprimentoRaquete = 10;

let colidiu = false;
let colidiuOponente = false;

//variaveis velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


let velocidadeYOponente =0;

let meusPontos = 0;
let pontosOponente = 0;

let raquetada;
let ponto;
let trilha;

let chanceDeErrar=35;
let texto = "Desenvolvido por Alessandro";

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(22, 222, 75);
  textSize(10);
  textFont('Arial');
  text(texto, 70, 397);
  fill('#FFFFFF');
  rect(290,0,10,400);
  mostraBolinha();
  raquetes(xRaqueteE,yRaqueteE);
  raquetes(xRaqueteD,yRaqueteD);
  movimentarBolinha();
  baterBordas();
  movimentarRaquetes();
  //verificarColisao();
  colisaoBiblioteca();
  placar();
  mostrarPlacar();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
    circle(xBolinha,yBolinha,diametro);

}

function movimentarBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function baterBordas(){
    if (xBolinha + centroBolinha > width || xBolinha - centroBolinha<0){
    velocidadeXBolinha*=-1;
  }

    if (yBolinha + centroBolinha > height || yBolinha - centroBolinha<0){
    velocidadeYBolinha*=-1;
  }


}

function raquetes(x,y){
  rect(x,y,comprimentoRaquete,alturaRaquete);
 
}

function movimentarRaquetes(){
  if(keyIsDown(DOWN_ARROW) && yRaqueteE <=(height - alturaRaquete)){
    yRaqueteE += 10;
  }
  if(keyIsDown(UP_ARROW) && yRaqueteE >=0){
    yRaqueteE -= 10;
  }
   velocidadeYOponente = yBolinha - yRaqueteD - comprimentoRaquete/2 -30 ;
yRaqueteD += velocidadeYOponente - chanceDeErrar;
  if(keyIsDown(83)&& yRaqueteD <=(height - alturaRaquete)){
    yRaqueteD+=10;
  }
  if(keyIsDown(87)&& yRaqueteD >=0){
    yRaqueteD-=10;
  }
}

function verificarColisao(){
   if(xBolinha - centroBolinha < xRaqueteE + comprimentoRaquete && yBolinha - centroBolinha <= yRaqueteE + alturaRaquete && yBolinha  >= yRaqueteE){
     velocidadeXBolinha *= -1;
  }
}

function colisaoBiblioteca(){
  colidiu = collideRectCircle(xRaqueteE, yRaqueteE, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, centroBolinha);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    chanceDeErrar+=2;
  }
  colidiuOponente = collideRectCircle(xRaqueteD, yRaqueteD, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, centroBolinha);
  if(colidiuOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function placar(){
  if(xBolinha> 590){
    meusPontos += 1;
    ponto.play();
    chanceDeErrar=35;
  }
  if(xBolinha < 10  ){
    pontosOponente += 1;   
    ponto.play();
    chanceDeErrar=35;
  }
}

function mostrarPlacar(){
  fill(255);
  textAlign(CENTER);
  textSize(25);
  fill(255,165,0);
  rect(200,20,60,40,10);
  fill(255);
  text(meusPontos, 230,50);
  fill(255,165,0);
  stroke(255);
  rect(340,20,60,40,10);
  fill(255);
  text(pontosOponente,370,50);
}

function bolinhaNaoFicaPresa(){
  if(xBolinha - centroBolinha < 0 ){
  xBolinha=23;
     chanceDeErrar+=1;
  }
  if(xBolinha + centroBolinha > 600){
    xBolinha=570;
     chanceDeErrar-=1;
  }
}

