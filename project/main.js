var container, stats;
var camera, scene, projector, renderer;
var mesh;

init();
animate();

function init() {
  container = document.getElementById("scene_2");
  camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
  camera.position.set(0, 0, 0);
  camera.target = new THREE.Vector3( 0, 15, 0 );
  scene = new THREE.Scene();
  var light = new THREE.DirectionalLight( 0xefefff, 2 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );
  var light = new THREE.DirectionalLight( 0xffefef, 2 );
  light.position.set( -1, -1, -1 ).normalize();
  scene.add( light );
  var loader = new THREE.JSONLoader( true );
  loader.load( "models/bulldog_04.json", function( geometry ) {
    mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
    mesh.scale.set( 1.5, 1.5, 1.5 );
    mesh.position.y = 10;
    scene.add( mesh );
  } );
  renderer = new THREE.WebGLRenderer();
  renderer.sortObjects = false;
  renderer.setSize( 800, 800 );
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

var radius = 30;
var theta = 0;
var duration = 600;
var keyframes = 35 /*16*/, interpolation = duration / keyframes;
var lastKeyframe = 0, currentKeyframe = 0;

function render() {
  theta += 0.0;
  camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
  camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
  camera.position.y = 10;
  camera.lookAt( camera.target );
  if ( mesh ) {
    var time = Date.now() % duration;
    var keyframe = Math.floor( time / interpolation ) + 1;
    if ( keyframe != currentKeyframe ) {
      mesh.morphTargetInfluences[ lastKeyframe ] = 0;
      mesh.morphTargetInfluences[ currentKeyframe ] = 1;
      mesh.morphTargetInfluences[ keyframe ] = 0;
      lastKeyframe = currentKeyframe;
      currentKeyframe = keyframe;
    }
    mesh.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
    mesh.morphTargetInfluences[ lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];
  }
  renderer.render( scene, camera );
}










