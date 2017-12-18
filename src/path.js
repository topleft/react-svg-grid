const Snap = window.Snap;

export default class Path {
    constructor(obj) {
      this.id = obj.id || new Date();
      this.data = obj.data; 
      this.fillColor = obj.fillColor || 'transparent'; 
      this.strokeColor = obj.strokeColor || '#000'; 
      this.strokeWidth = obj.strokeWidth || 2;
      this.timeout = obj.timeout || 0; 
      this.duration = obj.duration || 500;
      this.class = 'button'
      this.link = obj.link;
      this.x = obj.x;
      this.y = obj.y;
      this.r = obj.r;
      this.pathLength = Snap.path.getTotalLength(this.data);
      this.subPath = Snap.path.getSubpath(this.data, 0, 0)
      this.instantiatedPath = null;
    }
  
    instantiatePath (paper) {
      this.instantiatedPath = paper.path({
        path: this.subPath,
        stroke: this.strokeColor,
        fill: this.fillColor,
        strokeWidth: 0,
        fillOpacity: 0,
      });
    }
  
    getStep(step) {
      return Snap.path.getSubpath(this.data, 0, step)
    }
  
    traceStep(step) {
      this.instantiatedPath.attr({
        path: this.getStep(step),
        strokeWidth: this.strokeWidth,
        id: this.id,
        class: this.class,
        // fillOpacity: 100,        
        fill: this.fillColor,
        stroke: this.strokeColor
      });   
    }
    
    trace (paper) {
      this.instantiatePath(paper);
      const traceStep = this.traceStep.bind(this)
      setTimeout(() => { 
        Snap.animate(0, this.pathLength,
          traceStep, // end of step function (must bind to class instance)
          this.duration //duration
        ); //Snap.animate
      }, this.timeout)
    }
    
  }