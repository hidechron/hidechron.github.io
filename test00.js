rnd = Math.random();
var time = 0;
var myPoints = [];
var myTris = [];
var curP = [0, 5, 14];
var wait = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  fill(150);

  // INSTRUS ==========================================
  drums = EDrums('x*o*x*o-', 1/4);
  followD = Follow(drums);

  a = Pluck();
  a.play(Rndi(220, 880), 1/4);
  followP = Follow(a);

  // CREATING POINTS ==================================
  angleMode(DEGREES);
  //strokeWeight(5);
  for (var i=0; i<20; i++){
    myPoints[i] = new pointr;
  }

  // CREATING TRIS ====================================
  for(var i=0; i<3; i++){
    myTris[i] = new tris;
  }
}

// ===================================================
// ===================================================
function draw() {
  //background(follow.getValue()*255)
  background(30);
  ellipseMode(RADIUS);

  // TRIANGLES ========================================
  var triscol = color(245, 245, 245, 25);
  strokeWeight(0);
  fill(triscol);

  wait -= 1;

  // si le son des cordes est élevé changer de points pour les triangles.
  if(followP.getValue() > 0.020 && wait < 0){
    for(var i=0; i<curP.length; i++){
      curP[i] = (curP[i] + 2) % (myPoints.length-3);
    }
    wait = 25;
  }

  for(var i=0; i<curP.length; i++){
    console.log(curP[i]);
    triangle(myPoints[curP[i]].posx, myPoints[curP[i]].posy,
      myPoints[curP[i]+1].posx, myPoints[curP[i]+1].posy,
      myPoints[curP[i]+2].posx, myPoints[curP[i]+2].posy);
  }


  // MOVING POINTS =====================================
  strokeWeight(5);
  fill(245);
  for(var i=0; i<myPoints.length; i++){
    pointSin.call(myPoints[i]);
    ellipse(myPoints[i].posx, myPoints[i].posy, 5, 5);
  }

  time += 1;
}

// ====================================================
// ====================================================

function pointr() {
  this.origx = 200 + Math.random()*(windowWidth-400);
  this.origy = 200 + Math.random()*(windowHeight-400);
  this.posx = this.origx;
  this.posy = this.origy;
  this.speed = 0.2;
  this.angle = Math.random()*360;
}

var pointSin = function() {
  this.speed = 0.2 + followD.getValue()*3;
  this.angle += this.speed;

  if(this.angle > 360){
    this.angle = 0;
  }

  this.posx = windowWidth/2 + (this.origx-windowWidth/2) * cos(this.angle);
  this.posy = windowHeight/2 + (this.origy-windowHeight/2) * cos(this.angle);
}

function tris(){
  this.points = [floor(Math.random*20),floor(Math.random*20),floor(Math.random*20)];
  this.wait = 15;
}

var trisChange = function(){

}
