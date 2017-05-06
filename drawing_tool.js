class DrawingTool {
  constructor(width, height) {
    this.nodes = [];
    this.canvasHeight = height + 1;
    this.canvasWidth = width + 1;
    while(this.nodes.push([]) <= this.canvasHeight);
    this.bufferCanvas(width, height);
  }
  bufferCanvas(width, height){
    let x1 = 0;
    let y1 = 0;
    let x2 = width + 1;
    let y2 = height + 1;
    this.bufferLine(x1, y1, x1, y2, '|', true);
    this.bufferLine(x2, y1, x2, y2, '|', true);
    this.bufferLine(x1, y1, x2, y1, '-', true);
    this.bufferLine(x1, y2, x2, y2, '-', true);
  }
  bufferLine(x1, y1, x2, y2, character, canvas){
    if (!canvas) {
      this.validateCoordinate(x1, y1);
      this.validateCoordinate(x2, y2);
    }
     if (x1 == x2) {//vertical
       if (y1 > y2) {
         let _y1 = y1;
         y1 = y2;
         y2 = _y1;
       }
       for (let i = y1; i <= y2; i++) {
         this.nodes[i][x1] = character;
       }
     } else if(y1 == y2){//horizontal
       if (x1 > x2) {
         let _x1 = x1;
         x1 = x2;
         x2 = _x1;
       }
       for (let i = x1; i <= x2; i++) {
         this.nodes[y1][i] = character;
       }
     } else {
       throw new Error('The coordinates do not form a straight line. Must be either {x1} equals {x2} or {y1} equals {y2}.');
     }
  }
  bufferRectangle(x1, y1, x2, y2, character){
    this.bufferLine(x1, y1, x2, y1, character);
    this.bufferLine(x1, y2, x2, y2, character);
    this.bufferLine(x1, y1, x1, y2, character);
    this.bufferLine(x2, y1, x2, y2, character);
  }
  bufferBucketFill(x, y, replacement_color){
    this.validateCoordinate(x, y);
    let target_color = this.nodes[y][x];
    if(target_color === replacement_color){
        return;
    }
    this._bufferBucketFill(x, y, target_color, replacement_color);
  }
  _bufferBucketFill(x, y, target_color, replacement_color){
    if(target_color !== this.nodes[y][x]){
        return;
    }
    this.nodes[y][x] = replacement_color;
    this._bufferBucketFill(x, y+1, target_color, replacement_color);
    this._bufferBucketFill(x+1, y, target_color, replacement_color);
    this._bufferBucketFill(x, y-1, target_color, replacement_color);
    this._bufferBucketFill(x-1, y, target_color, replacement_color);
  }
  draw(){
    let screen = "";
    for (let y = 0; y <= this.canvasHeight; y++) {
      for (let x = 0; x <= this.canvasWidth; x++) {
         var node = this.nodes[y][x];
         screen += node || " ";
      }
      screen += "\n";
    }
    return screen;
  }
  validateCoordinate(x, y){
    if (x < 1 || y < 1 || x >= this.canvasWidth || y >= this.canvasHeight) {
      throw new Error('x: '+x+' and y: '+y+' is an invalid coordinate. The coordinates must be pointed inside the canvas. width: '+this.canvasWidth+', height: '+this.canvasHeight);
    }
  }
}
