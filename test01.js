var time = 0;
var myRotaters = [];
var pattern = [0,1,2,3,4,5];

function preload() {
  myBeat = loadSound('sounds/kk.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  fill(150);
  angleMode(DEGREES);

  // INSTRUS ===================================================================
  drums = EDrums('x*o*x*o-', 1/4);
  followD = Follow(drums);

  Synthy = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1) })
  Synthy.play( [131, 131, 196, 131, 208, 131,
    98, 98, 147, 156, 92, 92, 147, 165], 1/4 );
  followS = Follow(Synthy);
  // Phrase ============================================================
  myPhrase = new p5.Phrase('beat',makeSound(), pattern);
  myPart = new p5.Part();
  myPart.addPhrase(myPhrase);
  myPart.setBPM(60);
  myPart.start();
}

// =============================================================================
// =============================================================================
function draw() {
  //background(follow.getValue()*255)
  background(30);

  // Birth and death of rotaters ===============================================
  if(time % 6 == 0){
    myRotaters.push(new rotater(followS.getValue()*60));

    if(myRotaters[0].angle <= -180){
      myRotaters.shift();
    }
  }

  // Updating rotaters =========================================================
  for(var i=0; i<myRotaters.length; i++){
    myRotaters[i].angle -= 1;
    moveRotater.call(myRotaters[i]);
    strokeWeight(5);
    stroke(myRotaters[i].col);
    line(myRotaters[i].posx, myRotaters[i].posy,
      myRotaters[i].outerx, myRotaters[i].outery);
  }

  time += 1;
  console.log(myRotaters.length);
}

// =============================================================================
// =============================================================================
function rotater(size) {
  this.posx = windowWidth/2;
  this.posy = windowHeight/2 - windowHeight/4;
  this.outerx = this.posx;
  this.outery = this.posy;
  this.angle = 180;
  this.size = size;
  this.col = color(245);
  this.lerp = 0.1;
}

function moveRotater() {
  this.posx = windowWidth/2 + sin(this.angle)*150;
  this.posy = windowHeight/2 + cos(this.angle)*150;
  this.outerx = windowWidth/2 + sin(this.angle)*(150+this.size);
  this.outery = windowHeight/2 + cos(this.angle)*(150+this.size);
  this.lerp += 0.002;
  this.col = lerpColor(color(245), color(5), this.lerp);
}

function makeSound(time, playbackRate) {
  myBeat.rate(playbackRate);
  myBeat.play(time);
}
