set: function(){
		this.center.translateX(this.position.x);
		this.center.translateZ(this.position.y);
		this.center.rotation.y = this.direction;
	},

	setPosition: function(x, z){
		this.position.x = x;
		this.position.y = z;
		this.set(); 
	},

	setRotation: function(rotation){
		this.direction = rotation;
		this.set();
	},