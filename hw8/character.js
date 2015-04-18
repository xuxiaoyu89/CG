//draw a dog and a people

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
	run: function(dest, dPos, bPos){
		//console.log("running");
		var dirVector = new Vec2(bPos.x-dPos.x, bPos.y-dPos.y);
		var goalDir = Math.atan(dirVector.x/dirVector.y);
		
		if (Math.abs(goalDir-this.direction) > 0.02){
			//change the direction
			var diff = goalDir - this.direction;
			var turnStep;

			if (diff > 0){
				turnStep = 1.0/100.0;
			}
			else {
				turnStep = -1.0/100.0;
			}
			this.direction += turnStep;
			this.center.rotation.y = -this.direction;
			//jump up and turn

			return false;
		}
		
		//this.center.rotation.y = dir;
		return true;
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








