
var PI = 3.1415926;

function createCube(j, tx, tz, rotation){
	var geometry = new THREE.BoxGeometry( 1, 0.1, 50 );
	var material;
	if (j%2 === 0){
		material = new THREE.MeshBasicMaterial( {color: 0x34ED78} );
	}
	else {
		material = new THREE.MeshBasicMaterial( {color: 0x137870} );
	}

	//var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var cube = new THREE.Mesh( geometry, material );
	cube.translateX(tx);
	cube.translateY(tz);
	cube.rotation.z = -rotation;
	cube.scale.set(5,5,5);
	return cube;
}


function Land(){
  this.center = new THREE.Mesh();
  theta = 0;
  
    for (var j=0; j<1000; j++){
      theta = 2*PI*j/1000;
      var cube = createCube(j, 100*Math.sin(theta), 100*Math.cos(theta), theta);
      this.center.add(cube);
  }
  this.center.translateY(-93.2);
}


function createCube1(rx,ry,rz,tx,ty,tz){
	var geometry = new THREE.BoxGeometry( 1, 0.01, 1 );
	var material = new THREE.MeshBasicMaterial( {color: 0x6699FF} );
	var mesh = new THREE.Mesh(geometry, material);
	mesh.translateX(tx);
	mesh.translateY(ty);
	mesh.translateZ(tz);
	mesh.rotation.set(rx, ry, rz);
	return mesh;
}


function Sky(){
	this.cube = new THREE.Mesh();
	this.cube.add( createCube1(0, 0, 0, 0, 0.5, 0 ) );
	this.cube.add( createCube1(0, 0, 0, 0, -0.5, 0 ) );
	this.cube.add( createCube1(PI/2, 0, 0, 0, 0, 0.5 ) );
	this.cube.add( createCube1(PI/2, 0, 0, 0, 0, -0.5) );
	this.cube.add( createCube1(0, 0, PI/2, 0.5, 0, 0 ) );
	this.cube.add( createCube1(0, 0, PI/2, -0.5, 0, 0 ) );
	this.cube.scale.set(1000, 1000, 1000);
	
}











