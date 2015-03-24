function SmallBird(){
      this.leftWing = [];
      this.rightWing = [];
      this.head = [];
      var x, y, z;
      var theta, phi;
      for (var i=0; i<v; i++){
            var line = [];
            phi = PI*i/(v-1) - PI/2;
            y = 3*Math.sin(phi);
            for (var j=0; j<u; j++){
                  theta = 2*PI*j/(u);
                  x = Math.cos(phi)*Math.sin(theta)*2;
                  z = Math.cos(phi)*Math.cos(theta);
                  line.push(new Vector3(x,y,z));
            }
            this.body.push(line);
      }

      //create the wings
      this.leftWing = [new Vector3(2,2,0), new Vector3(2,0,0)];
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
      	for (var i=0; i<this.leftWing.length; i++){
      		var newPoint = new Vector3(0,0,0);
	      	m.transform(this.leftWing[i], newPoint);
	      	this.leftWing[i] = newPoint;
      	}

	},

      draw : function(ctx, height, width) {
      	for (var i=0; i<this.body.length; i++){
      		for (var j=0; j<this.body[0].length;j++){
	      		this.body[i][j].x = width/2 + this.body[i][j].x*(width/2);
	      		this.body[i][j].y = height/2 - this.body[i][j].y*(width/2);
      		}
      	}

      	for (var i=0; i<this.leftWing.length; i++){
      		this.leftWing[i].x = width/2 + this.leftWing[i].x*(width/2);
	      	this.leftWing[i].y = height/2 - this.leftWing[i].y*(width/2);      	}
		}


      	ctx.strokeStyle = 'red';
		ctx.beginPath();
		/*
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
      	*/

      	ctx.moveTo(this.leftWing[0].x, this.leftWing[0].y);
      	for (var i=0; i<this.leftWing.length; i++){
      		ctx.lineTo(this.leftWing[i].x, this.leftWing[i].y);
      	}
      	ctx.stroke();
   	},
}