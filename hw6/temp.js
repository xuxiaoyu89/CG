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