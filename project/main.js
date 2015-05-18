

var container, stats;
var camera, scene, projector, renderer;
var mesh, mesh1, land;
var zRotation = 0;
var yPosition = 8;
var cameraY = 10;


init();

var radius = 50;
var theta = 0;
var speed = 1.0;
//0.0: very unhappy
//1.0: very happy
var duration = 1500;
var keyframes = 12 /*16*/, interpolation = duration / keyframes;
var lastKeyframe = 0, currentKeyframe = 0, startFrame = 0;

var sitFlag = false;

animate();

function init() {
  container = document.getElementById("scene_2");
  camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
  camera.position.set(0, 0, 0);
  camera.target = new THREE.Vector3( 0, 10, 0 );
  scene = new THREE.Scene();

  sky = new Sky();
  scene.add(sky.cube);

  var light1 = new THREE.DirectionalLight( 0xefefff, 2 );
  light1.position.set( 10, 20, 10 ).normalize();
  scene.add( light1 );
 
  var light2 = new THREE.DirectionalLight( 0xefefff, 2 );
  light2.position.set( 10, 20, -10 ).normalize();
  scene.add( light2 );

  var light3 = new THREE.DirectionalLight( 0xefefff, 2 );
  light3.position.set( -10, 0, 0 ).normalize();
  scene.add( light3 );

  var loader = new THREE.JSONLoader( true );
  loader.load( "models/bulldog_08.json", function( geometry ) {
    mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
    mesh.scale.set( 1.5, 1.5, 1.5 );
    mesh.position.y = 10;
    scene.add( mesh );
  } );
  

   
  var geometry = new THREE.SphereGeometry( 20, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(-100);
  sphere.translateY(100);
  sphere.translateZ(-500);
  scene.add( sphere );
 


  land = new Land();
  scene.add(land.center);

  renderer = new THREE.WebGLRenderer();
  renderer.sortObjects = false;
  renderer.setSize( 700, 700 );
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame( animate );

  //sitting
  if (sitFlag){
    renderSitting();
    return;
  }

  //running
  if (speed > 1.5) {
    renderRunning();
  }
  //walking 
  if (speed <= 1.5 && speed > 0.0) {
    renderWalking();
  }
  //standing
  if (speed == 0.0){
    renderStanding();
  }
  //render();
}

function renderRunning(){
   duration = 1500/speed;
   keyframes = 34; // 1-35
   startFrame = 1;
   interpolation = duration/keyframes;
   render(startFrame, speed*6, 0.3);
}


function renderWalking(){
  duration = 1500/speed;
  keyframes = 12; // 45-57
  startFrame = 45;
  interpolation = duration/keyframes;
  render(startFrame, 6*speed, 0);
}

function renderStanding(){
  //duration = 500;
  var x = document.getElementById("happy");
  //happy
  if (x.checked) {
    duration = 300;
    keyframes = 8; // 36-44
    startFrame = 36;
  }
  else {
    duration = 1000;
    keyframes = 8; // 60-68
    startFrame = 60;
  }
  interpolation = duration/keyframes;
  render(startFrame, 0, 0.2);
}

function renderSitting(){
  duration = 1500;
  keyframes = 9; // 70-78
  startFrame = 70;
  interpolation = duration/keyframes;
  render(startFrame, 0, -1);
}

function render(startFrame, speed, delta) {
  //theta += 0.2;
  //camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
  //camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
  camera.position.x = radius * Math.sin( zRotation * Math.PI  );
  camera.position.z = radius * Math.cos( zRotation * Math.PI  );
  camera.position.y = cameraY;
  camera.lookAt( camera.target );
  //console.log(currentKeyframe);
  if ( mesh ) {
    var time = Date.now() % duration;
    var keyframe = Math.floor( time / interpolation ) + startFrame;
    if ( keyframe != currentKeyframe ) {
      mesh.morphTargetInfluences[ lastKeyframe ] = 0;
      mesh.morphTargetInfluences[ currentKeyframe ] = 1;
      mesh.morphTargetInfluences[ keyframe ] = 0;
      lastKeyframe = currentKeyframe;
      currentKeyframe = keyframe;
    }
    mesh.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
    mesh.morphTargetInfluences[ lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];
    mesh.translateY(delta);
  }
  land.center.rotation.z += -speed/10000;
  renderer.render( scene, camera );
  if (mesh) mesh.translateY(-delta);
}

//user control
function rotateZP(){
  zRotation += 0.1; 
}

function rotateZM(){
  zRotation -= 0.1;
}

function moveUp(){
  cameraY += 2;
}

function moveDown(){
  cameraY -= 2;
}

function zoomIn(){
   radius -= 10;
}

function zoomOut(){ 
   radius += 10;
}

function speedUp(){
  if (speed == 0.0) speed = 1;
  sitFlag = false;
  if (speed > 4.0) return;
  if (speed > 1.5){
    speed += 0.3;
  }
  else{
     speed += 0.1;
  }
}

function speedDown(){
  sitFlag = false;
  if (speed <= 1.0) return;
  speed -= 0.1;
}

function stand(){
  sitFlag = false;
  speed = 0.0;
}

function sit(){
  sitFlag = true;
}






