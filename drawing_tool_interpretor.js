class DrawingToolInterpretor {
  constructor(commandLine) {
    this.commands = [];
    this.validateCommands(commandLine);
    this.drawingTool = new DrawingTool(this.canvasCommand.width, this.canvasCommand.height);
  }
  draw(){
    let outputText = this.drawingTool.draw();//draw canvas
    for (let i = 0; i < this.commands.length; i++) {
      var command = this.commands[i];
      if (command.type == 'L') {
        this.drawingTool.bufferLine(command.x1, command.y1, command.x2, command.y2, 'x');
        outputText += this.drawingTool.draw();
      } else if(command.type == 'R'){
        this.drawingTool.bufferRectangle(command.x1, command.y1, command.x2, command.y2, 'x');
        outputText += this.drawingTool.draw();
      } else if(command.type == 'B'){
        this.drawingTool.bufferBucketFill(command.x, command.y, command.color);
        outputText += this.drawingTool.draw();
      }
    }
    return outputText;
  }
  validateCommands(commandLine){
    let commands = commandLine.split('\n');
    commands = commands.filter(function(n){ return n });//clean empty values
    this.validateCanvasCommand(commands[0]);
    for (let i = 1; i < commands.length; i++) {
      var command = commands[i];
      let commandType = command[0];
      if(commandType == 'L' || commandType == 'R'){//line or rectangle
        let shapeCommand = this.formatShapeCommand(command);
        this.commands.push(shapeCommand);
      }
      else if(commandType == 'B'){//bucketfill
        let bucketFillCommand = this.formatBucketFillCommand(command);
        this.commands.push(bucketFillCommand);
      } else {
         throw new Error("The program interpret the following list of commands: \n L {x1} {y1} {x2} {y2}: Create Line \n R {x1} {y1} {x2} {y2}: Create Rectangle \n B {x} {y} {color}: Bucket Fill ");
      }
    }
  }
  validateCanvasCommand(command){
    let commandSplitted = command.split(' ');
    if(command[0] !== 'C'){
      throw new Error('The first command must be the canvas parameters, i.e. "C {width} {height}"');
    }
    this.canvasCommand = {
      width: parseInt(commandSplitted[1]),
      height: parseInt(commandSplitted[2])
    };
    if(this.canvasCommand.width < 1 || this.canvasCommand.height < 1){
      throw new Error('The canvas parameters must be a positive number.');
    }
  }
  formatShapeCommand(command){
    let commandSplitted = command.split(' ');
    return {
      type: command[0],
      x1: parseInt(commandSplitted[1]),
      y1: parseInt(commandSplitted[2]),
      x2: parseInt(commandSplitted[3]),
      y2: parseInt(commandSplitted[4])
    };
  }
  formatBucketFillCommand(command){
    let commandSplitted = command.split(' ');
    return {
      type: 'B',
      x: parseInt(commandSplitted[1]),
      y: parseInt(commandSplitted[2]),
      color: commandSplitted[3]
    }
  }
}
