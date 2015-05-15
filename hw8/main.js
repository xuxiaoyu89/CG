window.time = 0;
var PI = 3.1415926;

function Vec2(x, y){
   this.x = x;
   this.y = y;
}

Vec2.prototype = {
   set: function(x, y){
      this.x = x;
      this.y = y;
   }
}
window.SimpleScene = function() {
   this.init = function(name) {
      this.scene = new THREE.Scene();

      // CREATE THE CAMERA, AND ATTACH IT TO THE SCENE.

      var camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
      camera.position.z = 20;
      this.scene.add(camera);

      // CREATE THE WEBGL RENDERER, AND ATTACH IT TO THE DOCUMENT BODY.

      var renderer = new THREE.WebGLRenderer( { alpha: true } );
      renderer.setSize(800, 800);
      this.renderer = renderer;

      var elem = document.getElementById(name);
      document.getElementById(name).appendChild(renderer.domElement);

      // CALL THE USER'S SETUP FUNCTION JUST ONCE.

      this.setup();

      // START THE ANIMATION LOOP.

      var that = this;
      (function tick() {
         time = (new Date().getTime()) / 100;
         that.update(time);
         renderer.render(that.scene, camera);
         requestAnimationFrame(tick);
      })();
   }
 };

function Scene2() {
   var box, joint, ball;
   var dog, bone, land;

   this.startPoint = new Vec2(0,0);
   this.endPoint = new Vec2(0,0);
   this.lastVector = new Vec2(100.0,24.0);
   this.mouseDownFlag = false;
   this.bonePosition = undefined;
   this.dogPosition = undefined;

   //this.reachedFlag = false;

   this.setup = function() {
      var light = new THREE.DirectionalLight(0xffffff);
      light.position.set(2,5,2).normalize();
      this.scene.add(light);

      var bonePosition = new Vec2(0,0);
      var dogPosition = new Vec2(3,3);

      dog = new Dog(dogPosition.x, dogPosition.y);
      bone = new Bone(bonePosition.x, bonePosition.y);   // position of bone;

      var joint = new THREE.Mesh();
      joint.add(dog.center);
      joint.add(bone.center);

      joint.translateY(0.65);


      land = new Land();
      land.center.add(joint);
      this.scene.add(land.center);

      //land.center.rotation.y= PI/3.0;

   }

   this.update = function(time) {
      //console.log(this.endPoint.x - this.startPoint.x);
      land.center.rotation.y = (this.lastVector.x + this.endPoint.x - this.startPoint.x)*PI/300;
      land.center.rotation.x = (this.lastVector.y + this.endPoint.y - this.startPoint.y)*PI/300;
      dog.run(dog.position, bone.position);
      //console.log(bone.position.x, bone.position.y);
      //change the dogPosition and bonePosition

      /*
      if (reachedFlag === true){
         var noiseObj = new Noise();
         var noise1 = noiseObj.noise([dog.position.x, dog.position.y, time]);
         var noise2 = noiseObj.noise([bone.position.x, bone.position.y, time]);
         bone.setPosition(-7, 7);
         //reachedFlag = false;
      }
      */
   }
}
Scene2.prototype = new SimpleScene;
var scene = new Scene2();
scene.init('scene_2');

var canvas = scene.renderer.domElement;
canvas.setCursor = function(x, y) {
      var r = this.getBoundingClientRect();
      this.cursor.set(x - r.left, y - r.top);
}

canvas.cursor = new Vec2(30, 0);
canvas.onmousedown = function(e) { 
   this.setCursor(e.clientX, e.clientY); 
   //console.log("x: " + this.cursor.x + ", " + "y: " + this.cursor.y);
   scene.mouseDownFlag = true;
   scene.startPoint = new Vec2(this.cursor.x, this.cursor.y);
   scene.endPoint = new Vec2(this.cursor.x, this.cursor.y);
}
canvas.onmousemove = function(e) { 
   this.setCursor(e.clientX, e.clientY); 
   if (scene.mouseDownFlag === true){
      scene.endPoint = new Vec2(this.cursor.x, this.cursor.y);
   }
}
canvas.onmouseup   = function(e) { 
   this.setCursor(e.clientX, e.clientY); 
   scene.mouseDownFlag = false;
   scene.endPoint = new Vec2(this.cursor.x, this.cursor.y);
   scene.lastVector.x += scene.endPoint.x - scene.startPoint.x;
   scene.lastVector.y += scene.endPoint.y - scene.startPoint.y;
   scene.startPoint.set(0,0);
   scene.endPoint.set(0,0);
}

function zoomIn(){
   var children = scene.scene.children;
   var camera = children[0];
   camera.position.z -= 2;
}

function zoomOut(){ 
   var children = scene.scene.children;
   var camera = children[0];
   camera.position.z += 2;
}






