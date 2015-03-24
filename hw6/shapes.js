
function Cylinder(u, v){
	this.vertices= []
	var x, y, z;
	for (var i=0; i<v; i++){
		var line = []
		y = 2*i/v - 1 ;
		for (var j=0; j<u; j++){
			x = Math.cos(2*PI*j/u)
			z = Math.sin(2*PI*j/u)
			line.push(new Vector3(x,y,z));
		}
		this.vertices.push(line);
	}
}

Cylinder.prototype = {
	transform: function(m){
		for (var i=0; i<this.vertices.length; i++){
	      	for (var j=0; j<this.vertices[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.vertices[i][j], newPoint);
	      		this.vertices[i][j] = newPoint;
	      	}
      	}
	},

    draw : function(ctx, height, width) {
      	for (var i=0; i<this.vertices.length; i++){
      		for (var j=0; j<this.vertices[0].length;j++){
	      		this.vertices[i][j].x = width/2 + this.vertices[i][j].x*(width/2);
	      		this.vertices[i][j].y = height/2 - this.vertices[i][j].y*(width/2);
      		}
      	}

      	ctx.strokeStyle = 'red';
		ctx.beginPath();
		for (var i=0; i<this.vertices.length; i++){
			ctx.moveTo(this.vertices[i][0].x, this.vertices[i][0].y);
      		for (var j=1; j<this.vertices[0].length;j++){
      			ctx.lineTo(this.vertices[i][j].x, this.vertices[i][j].y);
      		}
      		ctx.lineTo(this.vertices[i][0].x, this.vertices[i][0].y);
      	}
		for (var i=0; i<this.vertices[0].length; i++){
			ctx.moveTo(this.vertices[0][i].x, this.vertices[0][i].y);
      		for (var j=0; j<this.vertices.length;j++){
      			ctx.lineTo(this.vertices[j][i].x, this.vertices[j][i].y);
      		}
      			
      	}
      	ctx.stroke();
   	},
}






function Sphere(u, v){
	this.vertices= []
	var x, y, z;
	var theta, phi;
	for (var i=0; i<v; i++){
		var line = [];
		phi = PI*i/(v-1) - PI/2;
		y = Math.sin(phi);
		for (var j=0; j<u; j++){
			theta = 2*PI*j/(u);
			x = Math.cos(phi)*Math.sin(theta);
			z = Math.cos(phi)*Math.cos(theta);
			line.push(new Vector3(x,y,z));
		}
		this.vertices.push(line);
	}
}

Sphere.prototype = {
	transform: function(m){
		for (var i=0; i<this.vertices.length; i++){
	      	for (var j=0; j<this.vertices[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.vertices[i][j], newPoint);
	      		this.vertices[i][j] = newPoint;
	      	}
      	}
	},

    draw : function(ctx, height, width) {
      	for (var i=0; i<this.vertices.length; i++){
      		for (var j=0; j<this.vertices[0].length;j++){
	      		this.vertices[i][j].x = width/2 + this.vertices[i][j].x*(width/2);
	      		this.vertices[i][j].y = height/2 - this.vertices[i][j].y*(width/2);
      		}
      	}

      	ctx.strokeStyle = 'red';
		ctx.beginPath();
		for (var i=0; i<this.vertices.length; i++){
			ctx.moveTo(this.vertices[i][0].x, this.vertices[i][0].y);
      		for (var j=1; j<this.vertices[0].length;j++){
      			ctx.lineTo(this.vertices[i][j].x, this.vertices[i][j].y);
      		}
      		ctx.lineTo(this.vertices[i][0].x, this.vertices[i][0].y);
      	}
		for (var i=0; i<this.vertices[0].length; i++){
			ctx.moveTo(this.vertices[0][i].x, this.vertices[0][i].y);
      		for (var j=0; j<this.vertices.length;j++){
      			ctx.lineTo(this.vertices[j][i].x, this.vertices[j][i].y);
      		}
      			
      	}
      	ctx.stroke();
   	},
}



function Wave(u, v){
	this.vertices= []
	var x, y, z;
	for (var i=0; i<u; i++){
		var line = [];
		for (var j=0; j<v; j++){
			x = 2*i/(u-1) - 1;
			y = 2*j/(v-1) - 1;
			r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			z = 0.05*Math.cos(-r*30 + 2*time);
			line.push(new Vector3(x,y,z));
		}
		this.vertices.push(line);
	}	
}

Wave.prototype = {
	transform: function(m){
		for (var i=0; i<this.vertices.length; i++){
	      	for (var j=0; j<this.vertices[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.vertices[i][j], newPoint);
	      		this.vertices[i][j] = newPoint;
	      	}
      	}
	},

    draw : function(ctx, height, width) {
      	for (var i=0; i<this.vertices.length; i++){
      		for (var j=0; j<this.vertices[0].length;j++){
	      		this.vertices[i][j].x = width/2 + this.vertices[i][j].x*(width/2);
	      		this.vertices[i][j].y = height/2 - this.vertices[i][j].y*(width/2);
      		}
      	}

      	ctx.strokeStyle = 'red';
		ctx.beginPath();
		for (var i=0; i<this.vertices.length; i++){
			ctx.moveTo(this.vertices[i][0].x, this.vertices[i][0].y);
      		for (var j=1; j<this.vertices[0].length;j++){
      			ctx.lineTo(this.vertices[i][j].x, this.vertices[i][j].y);
      		}
      		ctx.lineTo(this.vertices[i][0].x, this.vertices[i][0].y);
      	}
		for (var i=0; i<this.vertices[0].length; i++){
			ctx.moveTo(this.vertices[0][i].x, this.vertices[0][i].y);
      		for (var j=0; j<this.vertices.length;j++){
      			ctx.lineTo(this.vertices[j][i].x, this.vertices[j][i].y);
      		}
      			
      	}
      	ctx.stroke();
   	},
}

function SmallBird(u,v){
	this.hands = [];
	this.body = [];
	var x, y, z;
	var theta, phi;
	for (var i=v/2; i<v; i++){
	    var line = [];
	    phi = PI*i/(v-1) - PI/2;
	    y = 2*Math.sin(phi);
	    for (var j=0; j<u; j++){
	          theta = 2*PI*j/(u);
	          x = Math.cos(phi)*Math.sin(theta);
	          z = Math.cos(phi)*Math.cos(theta);
	          line.push(new Vector3(x,y,z));
	    }
	    this.body.push(line);
	}

	//create the wings

	this.hands = [];
	y = 0;
	for (var i=0; i<12; i++){
		hand = [];
		x = 0.5*Math.sin(2*i*PI/11);
		z = 0.5*Math.cos(2*i*PI/11);
		for (var j=0; j<6; j++){
			hand.push(new Vector3(x, y, z));
		}
		this.hands.push(hand);
	}

}

SmallBird.prototype = {
	transform: function(m){
		for (var i=0; i<this.body.length; i++){
	      	for (var j=0; j<this.body[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.body[i][j], newPoint);
	      		this.body[i][j] = newPoint;
	      	}
      	}

      	var noise = [0.3, 0.1, 0.8, 0.4, 0.7, 0.15, 0.6, 0.9, 0.68, 0.25, 0.73, 0.34];
      	for (var i=0; i<this.hands.length; i++){
      		localM = new Matrix();
      		for (var j=1; j<this.hands[0].length; j++){
      			localM.translate(0,-0.2,0);
      			if (i%2 == 0) localM.rotateX(0.05*Math.sin(2*time + noise[i]*PI) + PI/2);
      			if (i%2 == 1) localM.rotateX(-0.05*Math.sin(2*time + noise[i]*PI)+ PI/2);
      			localM.transform(this.hands[i][j-1], this.hands[i][j]);
      		}
      	}

      	for (var i=0; i<this.hands.length; i++){
      		for (var j=0; j<this.hands[0].length; j++){
      			var newPoint = new Vector3(0,0,0);
	      		m.transform(this.hands[i][j], newPoint);
	      		this.hands[i][j] = newPoint;
      		}
      	}
      	

	},

  	draw : function(ctx, height, width) {
  		for (var i=0; i<this.body.length; i++){
      		for (var j=0; j<this.body[0].length;j++){
	      		this.body[i][j].x = width/2 + this.body[i][j].x*(width/2);
	      		this.body[i][j].y = height/2 - this.body[i][j].y*(width/2);
      		}
      	}

	  	for (var i=0; i<this.hands.length; i++){
	  		for (var j=0; j<this.hands[0].length; j++){
	  			this.hands[i][j].x = width/2 + this.hands[i][j].x*(width/2);
	      		this.hands[i][j].y = height/2 - this.hands[i][j].y*(width/2);
	  		}
		}

	  	ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.lineWidth = 1;
		
		for (var i=0; i<this.body.length; i++){
			ctx.moveTo(this.body[i][0].x, this.body[i][0].y);
	  		for (var j=1; j<this.body[0].length;j++){
	  			ctx.lineTo(this.body[i][j].x, this.body[i][j].y);
	  		}
	  		ctx.lineTo(this.body[i][0].x, this.body[i][0].y);
	  	}
		for (var i=0; i<this.body[0].length; i++){
			ctx.moveTo(this.body[0][i].x, this.body[0][i].y);
	  		for (var j=0; j<this.body.length;j++){
	  			ctx.lineTo(this.body[j][i].x, this.body[j][i].y);
	  		}
	  			
	  	}
	  	
    	
	  	for (var i=0; i<this.hands.length; i++){
	  		ctx.moveTo(this.hands[i][0].x, this.hands[i][0].y);
	  		for (var j=0; j<this.hands[i].length; j++){
	  			ctx.lineTo(this.hands[i][j].x, this.hands[i][j].y);
	  		}
	  	}
	  	
	  	ctx.stroke();
   	},
}





















