function Curve(){
	this.vertices = [];
	this.vertices.push(new Vector3(1,0,0));
	this.vertices.push(new Vector3(0,1,0));
	/*
	this.vertices.push(new Vector3(0,1,0));
	this.vertices.push(new Vector3(-0.5,0.5,0));
	*/
}

Curve.prototype = {
	transform: function(m){
		for (var i=0; i<this.vertices.length; i++){
			var newPoint = new Vector3(0,0,0);
	      		m.transform(this.vertices[i], newPoint);
	      		this.vertices[i] = newPoint;
		}
	},

	//hermite
	dot: function(nobs){	
		var basic = [
					[2,-2,1,1],
					[-3,3,-2,-1],
					[0,0,1,0],
					[1,0,0,0]
					];

		var result = [];
		for (var i=0; i<basic.length; i++){
			var temp = 0;
			for (var j=0; j<nobs.length; j++){
				temp += basic[i][j]*nobs[j];
			}
			result.push(temp);
		}
		return result;
	},

	//Bezier
	dot1: function(points){
		var basic = [
					[-1,3,-3,1],
					[3,-6,3,0],
					[-3,3,0,0],
					[1,0,0,0]
					];
		var result = [];
		for (var i=0; i<basic.length; i++){
			var temp = 0;
			for (var j=0; j<points.length; j++){
				temp += basic[i][j]*points[j];
			}
			result.push(temp);
		}
		return result;
	},

	draw: function(ctx, height, width){
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(width/2 + this.vertices[0].x*(width/2), 
				   height/2 - this.vertices[0].y*(width/2));

		for(var i=1; i<this.vertices.length; i++){
			var xCoeff, yCoeff;
			var xnobs = [this.vertices[i-1].x, this.vertices[i].x, -3, -1];
			var ynobs = [this.vertices[i-1].y, this.vertices[i].y, 1, 1];
			xCoeff = this.dot(xnobs);
			yCoeff = this.dot(ynobs);
			for (var t=0.01; t<1; t+=0.01){
				var currX = xCoeff[0]*Math.pow(t,3)+xCoeff[1]*Math.pow(t,2)+xCoeff[2]*Math.pow(t,1)+xCoeff[3];
				var currY = yCoeff[0]*Math.pow(t,3)+yCoeff[1]*Math.pow(t,2)+yCoeff[2]*Math.pow(t,1)+yCoeff[3];
				currX = width/2 + currX*(width/2);
				currY = height/2 - currY*(width/2);
				ctx.lineTo(currX, currY);
			}
		}
		ctx.stroke();
	},

	draw1: function(ctx, height, width){
		var B = new Vector3(0.4,0.1,0);
		var C = new Vector3(0.1,0.4,0);
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(width/2 + this.vertices[0].x*(width/2), 
				   height/2 - this.vertices[0].y*(width/2));

		for(var i=1; i<this.vertices.length; i++){
			var xCoeff, yCoeff;
			var xnobs = [this.vertices[i-1].x, B.x, C.x, this.vertices[i].x];
			var ynobs = [this.vertices[i-1].y, B.y, C.y, this.vertices[i].y];
			xCoeff = this.dot1(xnobs);
			yCoeff = this.dot1(ynobs);
			for (var t=0.01; t<1; t+=0.01){
				var currX = xCoeff[0]*Math.pow(t,3)+xCoeff[1]*Math.pow(t,2)+xCoeff[2]*Math.pow(t,1)+xCoeff[3];
				var currY = yCoeff[0]*Math.pow(t,3)+yCoeff[1]*Math.pow(t,2)+yCoeff[2]*Math.pow(t,1)+yCoeff[3];
				currX = width/2 + currX*(width/2);
				currY = height/2 - currY*(width/2);
				ctx.lineTo(currX, currY);
			}
		}
		ctx.stroke();
	}

}


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

    draw : function(ctx, width, height) {
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

    draw : function(ctx, width, height) {
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

    draw : function(ctx, width, height) {
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

  	draw : function(ctx, width, height) {
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


function Snake(d, l, direction){
	this.head = [];
	this.body = [];
	var x, y, z;
	x = 0;
	for (var i=0; i<l; i++){
		var circle = [];
		for (var j=0; j<d; j++){
			y = 0.2*Math.sin(2*j*PI/9);
			z = 0.2*Math.cos(2*j*PI/9);
			circle.push(new Vector3(x, y, z));
		}
		this.body.push(circle);
	}
	var theta, phi;
	for (var i=0; i<3; i++){
	    var line = [];
	    if (direction == 1) phi = PI*(i+3)/5 -PI/2;
	    else phi = PI*i/(5) - PI/2;
	    x = 2*Math.sin(phi);
	    for (var j=0; j<10; j++){
	          theta = 2*PI*j/(10);
	          y = Math.cos(phi)*Math.sin(theta);
	          z = Math.cos(phi)*Math.cos(theta);
	          line.push(new Vector3(x,y,z));
	    }
	    this.head.push(line);
	}

}

Snake.prototype = {
	transform: function(m, direction){

		var localM = new Matrix();
		for (var i=1; i<this.body.length; i++){
			localM.identity();
			localM.translate(-0.2*direction, 0, 0);
			localM.scale(1, (30-i/6)/30, (30-i/6)/30);
			localM.rotateY(0.05*Math.sin(4*time + PI/2 -i));
      		//if ((i/5)%2 == 1) localM.rotateY(-0.05*Math.sin(2*time + PI/2));
			for (var j=0; j<this.body[0].length; j++){
				localM.transform(this.body[i-1][j], this.body[i][j]);
			}
		}


 		
		for (var i=0; i<this.head.length; i++){
	      	for (var j=0; j<this.head[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.head[i][j], newPoint);
	      		this.head[i][j] = newPoint;
	      	}
      	}

		for (var i=0; i<this.body.length; i++){
	      	for (var j=0; j<this.body[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.body[i][j], newPoint);
	      		this.body[i][j] = newPoint;
	      	}
      	}

      	/*
      	for (var i=0; i<this.head.length; i++){
      		for (var j=0; j<this.head[0].length;j++){
	      		var newPoint = new Vector3(0,0,0);
	      		m.transform(this.body[i][j], newPoint);
	      		this.head[i][j] = newPoint;
      		}
      	}
		*/
	},

	draw: function(ctx, width, height){
		for (var i=0; i<this.head.length; i++){
      		for (var j=0; j<this.head[0].length;j++){
	      		this.head[i][j].x = width/2 + this.head[i][j].x*(width/2);
	      		this.head[i][j].y = height/2 - this.head[i][j].y*(width/2);
      		}
      	}

		for (var i=0; i<this.body.length; i++){
			for (var j=0; j<this.body[0].length; j++){
				this.body[i][j].x = width/2 + this.body[i][j].x*(width/2);
	      		this.body[i][j].y = height/2 - this.body[i][j].y*(width/2);
			}
		}

		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.lineWidth = 1;

		for (var i=0; i<this.head.length; i++){
		      ctx.moveTo(this.head[i][0].x, this.head[i][0].y);
		      for (var j=1; j<this.head[0].length;j++){
		            ctx.lineTo(this.head[i][j].x, this.head[i][j].y);
		      }
		      ctx.lineTo(this.head[i][0].x, this.head[i][0].y);
		}
		for (var i=0; i<this.head[0].length; i++){
		      ctx.moveTo(this.head[0][i].x, this.head[0][i].y);
		      for (var j=0; j<this.head.length;j++){
		            ctx.lineTo(this.head[j][i].x, this.head[j][i].y);
		      }
		            
		}

		
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
	  	ctx.stroke();

	},

}


















