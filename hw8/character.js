//draw a dog and a people
/*
For the final project, I would like to do animating characters. 
For the last homework, I draw a very simple dog and a bone, 
for the project, and I would like to continue working on this.

I would like to add more details to the characters.
I would like to add more animation to it. For example, the dog will can bark, sit, walk, run, and jump. 
Or other movements, like running to the bone and get it back, or wagging its tail when it sees a bone.
The dog can listen to your orders to do this movements.

I would also like to add some environment to the scene, some trees, flowers, rocks, sky, sun and wind.

If I have time, I can let the dog to have different moods, when it is happy, it tends to run faster, 
crazier, wags its tail more frequently. When its tired or bored, they tends to lay down and sleep. 
*/


function createCylinder(tx, ty, tz, rx, ry, rz, len){
	var geometry = new THREE.CylinderGeometry( 0.1, 0.1, len, 100 );
	var material = new THREE.MeshPhongMaterial({
						color: 0x2389D8, 
						specular: 0x009900, 
						shininess: 30, 
						shading: THREE.FlatShading 
					}); 
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.translateX(tx);
	cylinder.translateY(ty);
	cylinder.translateZ(tz);

	cylinder.rotation.x = rx;
	cylinder.rotation.y = ry;
	cylinder.rotation.z = rz;

	return cylinder;
}


function createCone(tx, ty, tz, rx, ry, rz, len, r1, r2){
	var geometry = new THREE.CylinderGeometry(r1, r2, len, 100 );
	var material = new THREE.MeshPhongMaterial({
						color: 0x2389D8, 
						specular: 0x009900, 
						shininess: 30, 
						shading: THREE.FlatShading 
					}); 
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.translateX(tx);
	cylinder.translateY(ty);
	cylinder.translateZ(tz);

	cylinder.rotation.x = rx;
	cylinder.rotation.y = ry;
	cylinder.rotation.z = rz;

	return cylinder;
}

function createCube(tx, tz){
	var geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
	var material;
	if ((tx+tz)%2 === 0){
		material = new THREE.MeshBasicMaterial( {color: 0x34ED78} );
	}
	else {
		material = new THREE.MeshBasicMaterial( {color: 0x137870} );
	}

	//var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var cube = new THREE.Mesh( geometry, material );
	cube.translateX(tx);
	cube.translateZ(tz);
	return cube;
}

function createSphere(tx, ty, tz, r){
	var geometry = new THREE.SphereGeometry(r, 100, 100);
	var material = new THREE.MeshPhongMaterial({
						color: 0x2389D8, 
						specular: 0x009900, 
						shininess: 30, 
						shading: THREE.FlatShading 
					}); 
	var sphere = new THREE.Mesh(geometry, material);
	sphere.translateX(tx);
	sphere.translateY(ty);
	sphere.translateZ(tz);
	return sphere;
}


function Dog(x, z){
	this.center = new THREE.Mesh();
	this.body = createCylinder(0,0,0,0,0,PI/2.0, 1.5); 

	this.frontShoulder = createCylinder(0, 0.7, 0, PI/2.0, 0, 0, 0.8); 
	this.body.add(this.frontShoulder);

	this.backShoulder  = createCylinder(0, -0.7, 0, PI/2.0, 0,0, 0.8);
	this.body.add(this.backShoulder);

	this.neck = createCylinder(0.2, 0.7, 0, 0, 0, PI*0.5, 0.4);
	this.body.add(this.neck);

	this.head = createCone(0.15,-0.4,0,0,0,PI/2.0,0.5,0.25,0.16);
	this.neck.add(this.head);

	this.legfl1 = createCylinder(-0.3,0.3,0,0,0,PI/2.0,0.5);
	this.frontShoulder.add(this.legfl1);

	this.legfr1 = createCylinder(-0.3,-0.3,0,0,0,PI/2.0,0.5);
	this.frontShoulder.add(this.legfr1);

	this.legbl1 = createCylinder(-0.3,0.3,0,0,0,PI/2.0,0.5);
	this.backShoulder.add(this.legbl1);

	this.legbr1 = createCylinder(-0.3,-0.3,0,0,0,PI/2.0,0.5);
	this.backShoulder.add(this.legbr1);

	this.center.add(this.body);

	this.position = new Vec2(x, z);
	this.center.translateX(this.position.x);
	this.center.translateZ(this.position.y);

	this.direction = 0;
	this.center.rotation.y = this.direction;
}


Dog.prototype = {
	setPosition: function(x, z){
		this.position.x = x;
		this.position.y = z;
		this.center.translateX(this.position.x);
		this.center.translateZ(this.position.y);
		//console.log("hello");	
	},

	setRotation: function(newDirection){
		this.direction = newDirection;
		this.center.rotation.y = -this.direction;
	},

	turn: function(dPos, bPos){
		//console.log("running");
		var dirVector = new Vec2(bPos.x-dPos.x, bPos.y-dPos.y);
		var goalDir = Math.atan(dirVector.x/dirVector.y);
		
		if (Math.abs(goalDir-this.direction) > 0.02){
			//change the direction
			var diff = goalDir - this.direction;
			var turnStep;

			if (diff > 0){
				turnStep = 1.0/50.0;
			}
			else {
				turnStep = -1.0/50.0;
			}

			var newDirection = this.direction + turnStep;
			this.setRotation(newDirection);

			return false;
		}
		
		//this.center.rotation.y = dir;
		return true;
	},

	run: function(dPos, bPos){
		//this.turn(dPos, bPos);

		/*
		var dirVector = new Vec2(bPos.x-dPos.x, bPos.y-dPos.y);

		if (Math.abs(dirVector.x) > 0.2){
			var diff = new Vec2(dirVector.y/100, dirVector.y/100);
			var goalDir = Math.atan(dirVector.x/dirVector.y);
			var runStep = 0.1;
			var newPosition = new Vec2(0,0);
			newPosition.x = this.position.x + runStep*Math.sin(goalDir);
			newPosition.y = this.position.y + runStep*Math.sin(goalDir);
			this.setPosition(newPosition.x, newPosition.y);
		}
		*/
		this.setPosition(this.position.x, this.position.y);
	}
}



function Bone(x, z){
	this.center = new THREE.Mesh()
	this.position = new Vec2(x, z)
	this.center.translateX(x);
	this.center.translateZ(z);

	var cone = createCone(0,0,0,PI/2.0,0,0,2,0.25,0.25);

	var sphere1 = createSphere(0.17,0.9,0,0.3);
	var sphere2 = createSphere(-0.17,0.9,0,0.3);
	var sphere3 = createSphere(0.17,-0.9,0,0.3);
	var sphere4 = createSphere(-0.17,-0.9,0,0.3);

	cone.add(sphere1);
	cone.add(sphere2);
	cone.add(sphere3);
	cone.add(sphere4);

	this.center.add(cone);
}

Bone.prototype = {
	setPosition: function(x, y){
		this.position.x = x;
		this.position.y = y;
		this.center.translateX(x);
		this.center.translateZ(y);
	}
}



function Land(){
	this.center = new THREE.Mesh();
	for (var i=0; i<30; i++){
		for (var j=0; j<30; j++){
			var cube = createCube(i-15, j-15);
			this.center.add(cube);
		}
	}
}








