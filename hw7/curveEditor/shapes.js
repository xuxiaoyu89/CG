
function Point(x, y, z){
	this.center = new Vector3(x, y, z);
	this.r = 10;
	this.fillColor = "red";
	this.draggable = true;

}

Point.prototype = {
	isInCircle: function(x, y){
		var distance = Math.pow(x-this.center.x, 2) + Math.pow(y-this.center.y, 2);
		return distance < Math.pow(this.r, 2);
	},

	setPosition: function(x, y){
		this.center.x = x;
		this.center.y = y;
	},

	draw: function(ctx){
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y,this.r,0,2*Math.PI);
		ctx.fillStyle = this.fillColor;
		ctx.fill();
		ctx.stroke();
		//console.log("hello");
	},
}

function Curve(x, y, ifMatch, lastCurve){
	if (ifMatch){
		this.pointA = lastCurve.pointD;
		var disX = lastCurve.pointD.center.x - lastCurve.pointC.center.x;
		var disY = lastCurve.pointD.center.y - lastCurve.pointC.center.y;

		this.pointB = new Point(lastCurve.pointD.center.x+disX, lastCurve.pointD.center.y+disY, 0);

		disX = (this.pointB.center.x + x)/2;
		disY = (this.pointB.center.y + y)/2;

		this.pointC = new Point(disX, disY, 0);
		this.pointD = new Point(x, y, 0);
	}

	else{
		this.pointA = new Point(x-120, y, 0);
		this.pointD = new Point(x+120, y, 0);

		//pointB and PointC are help points;
		this.pointB = new Point(x-40, y, 0);
		this.pointC = new Point(x+40, y, 0);
	}
}

Curve.prototype = {
	//Bezier
	dot: function(points){
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

	draw: function(ctx, showPoints, showLines){
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(this.pointA.center.x, this.pointA.center.B);

		var xCoeff, yCoeff;
		var xnobs = [this.pointA.center.x, this.pointB.center.x, this.pointC.center.x, this.pointD.center.x];
		var ynobs = [this.pointA.center.y, this.pointB.center.y, this.pointC.center.y, this.pointD.center.y];
		xCoeff = this.dot(xnobs);
		yCoeff = this.dot(ynobs);

		for (var t=0; t<=1.01; t+=0.01){
			var currX = xCoeff[0]*Math.pow(t,3)+xCoeff[1]*Math.pow(t,2)+xCoeff[2]*Math.pow(t,1)+xCoeff[3];
			var currY = yCoeff[0]*Math.pow(t,3)+yCoeff[1]*Math.pow(t,2)+yCoeff[2]*Math.pow(t,1)+yCoeff[3];
			ctx.lineTo(currX, currY);
		}
		//ctx.fill();
		ctx.stroke();

		if (showLines){
			ctx.strokeStyle = "green";
			ctx.beginPath();
			//draw the additional line;
			ctx.moveTo(this.pointA.center.x, this.pointA.center.y);
			ctx.lineTo(this.pointB.center.x, this.pointB.center.y);
			ctx.lineTo(this.pointC.center.x, this.pointC.center.y);
			ctx.lineTo(this.pointD.center.x, this.pointD.center.y);
			ctx.stroke();
		}

		if (showPoints){
			//draw the points;
			ctx.strokeStyle = "red";
			this.pointA.draw(ctx);
			this.pointB.draw(ctx);
			this.pointC.draw(ctx);
			this.pointD.draw(ctx);
			//ctx.stroke();
		}
	}

}


function Flower(x, y, size, numberOfCurves){
	this.center = new Vector3(x, y, 0);
	this.flowerColor = "red";
	this.r = size;
	this.numberOfCurves = numberOfCurves;
}

Flower.prototype = {
	isInFlower: function(x, y){
		var distance = Math.pow(x-this.center.x, 2) + Math.pow(y-this.center.y, 2);
		return distance < Math.pow(this.r, 2);
	},

	setPosition: function(x, y){
		this.center.x = x;
		this.center.y = y;
	},

	draw: function(ctx){
		//draw center;
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y,this.r,0,2*Math.PI);
		ctx.fillStyle = this.flowerColor;
		ctx.fill();
		ctx.stroke();

		var curves = [];
		for (i=0; i<this.numberOfCurves; i++){
			var w = i*2*Math.PI/this.numberOfCurves;
			var curve = new Curve(0,0,false,undefined);
			curve.pointA.center.x = this.center.x + this.r*Math.sin(w);
			curve.pointA.center.y = this.center.y + this.r*Math.cos(w); 
			curve.pointB.center.x = this.center.x + 12*this.r*Math.sin(w);
			curve.pointB.center.y = this.center.y + 12*this.r*Math.cos(w); 
			curve.pointC.center.x = this.center.x + 12*this.r*Math.sin(w+2*Math.PI/this.numberOfCurves);
			curve.pointC.center.y = this.center.y + 12*this.r*Math.cos(w+2*Math.PI/this.numberOfCurves); 
			curve.pointD.center.x = this.center.x + this.r*Math.sin(w+2*Math.PI/this.numberOfCurves);
			curve.pointD.center.y = this.center.y + this.r*Math.cos(w+2*Math.PI/this.numberOfCurves); 
			curves.push(curve);
		}

		//draw curve;
		for (var i=0; i<curves.length; i++){
			//console.log(this.curves[i]);
			curves[i].draw(ctx, false, false);
		}

	}
}
















