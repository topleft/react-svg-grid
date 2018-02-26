
const Snap = window.Snap;

export function createPaper(selector) {
    return Snap(selector);
}

export function createSet() {
    return new Snap.set();
}


export class SymmetricalCircleGrid {

    /**
    @paper: instance of Snap.svg Paper **already attached to the dom**
    @set: instance of a Snap.svg Set containing all sub elements of the main grid element 
    **/

    constructor(paper, set, shadow, circlesPerRow, hMargin, vMargin, radius, strokeColor, strokeWidth) {
        if (!(paper && paper.node))
            throw new Error('The paper argument must be an instance of Snap.svg Paper must be attached to a DOM element')
            
        if (!(set && set.type === 'set'))
            throw new Error('The set argument must be an instance of Snap.svg set')

        this.paper = paper;
        this.set = set;
        this.shadow = shadow;
        
        this._circlesPerRow = this.parseAndCheckIntArg(circlesPerRow, 'circlesPerRow');
        this._hMargin = this.parseAndCheckIntArg(hMargin, 'hMargin');
        this._vMargin = this.parseAndCheckIntArg(vMargin, 'vMargin');
        this._radius = this.parseAndCheckIntArg(radius, 'radius');
        this._strokeWidth = this.parseAndCheckFloatArg(strokeWidth, 'strokeWidth');
        this._strokeColor = strokeColor; // TODO need to right color checker
        this._previousHMargin = 0;
        this._previousVMargin = 0;
        this._previousRadius = 0;
        this._previousStrokeWidth = 0;
        this._previousStrokeColor = null;
        this._previousCirclesPerRow = 0;
    }

    set circlesPerRow(circlesPerRow) {
        this._previousCirclesPerRow = this._circlesPerRow;
        this._circlesPerRow = this.parseAndCheckIntArg(circlesPerRow, 'circlesPerRow');
    }
    
    set hMargin(hMargin) {
        this._previousHMargin = this._hMargin;
        this._hMargin = this.parseAndCheckIntArg(hMargin, 'hMargin');
    }
            
    set vMargin(vMargin) {
        this._previousVMargin = this._vMargin;
        this._vMargin = this.parseAndCheckIntArg(vMargin, 'vMargin');
    }
            
    set radius(radius) {
        this._previousRadius = this._radius;
        this._radius = this.parseAndCheckIntArg(radius, 'radius');
    }

    set strokeWidth(strokeWidth) {
        this._previousStrokeWidth = this._strokeWidth;
        this._strokeWidth = this.parseAndCheckIntArg(strokeWidth, 'strokeWidth');
    }

    set strokeColor(strokeColor) {
        this._previousStrokeColor = this._strokeColor;
        this._strokeColor = strokeColor;
    }

    set shadowOffset(shadowOffset) {
        this._shadowOffset = this.parseAndCheckFloatArg(shadowOffset, 'shadowOffset');
    }

    set shadowColor(shadowColor) {
        this._shadowColor = shadowColor;
    }

    get diameter() {
        return this._radius * 2;
    }

    get totalNumCircles() {
        return Math.pow(this._circlesPerRow, 2)
    }

    get previousTotalNumCircles() {
        return Math.pow(this._previousCirclesPerRow, 2)
    }

    get width() {
        return this._hMargin > this.diameter ? this._hMargin * this._circlesPerRow : (this._hMargin * (this._circlesPerRow - 1)) + this.diameter
    }

    get height() {
        return this._vMargin > this.diameter ? this._vMargin * this._circlesPerRow : (this._vMargin * (this._circlesPerRow - 1)) + this.diameter
    }

    get xOrigin() {
        return (-this.width / 2) + this._radius;
    }

    get yOrigin() {
        return (-this.height / 2) + this._radius;
    }

    get shadowOffset() {
        return this._shadowOffset || 0.2;
    }

    get shadowColor() {
        return this._shadowColor || '#555';
    }

    createCircle (x, y) {
        const c = this.paper.circle(x, y, this._radius);
        c.attr({
            stroke: this._strokeColor,
            strokeWidth: this._strokeWidth,
            fillOpacity: 0,
        })
        return c;
    }

    transformIntoShadowCircle(c, i) {
        if (!(i % this._circlesPerRow)) {
            this.shadowOffset += c.attr('r') / 100 // increase diameter to give depth to shadow
        }
        const r = (parseInt(c.attr('r'), 10) * this.shadowOffset) + parseInt(c.attr('r'), 10)
        const x = (parseInt(c.attr('cx'), 10) * this.shadowOffset) + parseInt(c.attr('cx'), 10)
        c.attr({
            cx: x,
            r: r,
            stroke: this.shadowColor,
            strokeWidth: this._strokeWidth,
            fillOpacity: 0,
            transform: "t0 50s",
            strokeOpacity: .5,
        })
        return c;
    }

    createRow(nthRow) {
        const row = [];
        let x = this.xOrigin;
        let y = this.yOrigin + (this._vMargin * (nthRow));
        for (let i = 0; i < this._circlesPerRow; i++) {
            let calculated_x = x + (this._hMargin * (i % this._circlesPerRow));
            row.push(this.createCircle(calculated_x, y))
        }
        return row;
    }
    
    addRow(index, row, set) {
        set.splice((index * this._circlesPerRow) || 0, 0, ...row)
    }
    
    addPartialRow(index, row) {
        const spliceOrigin = (((index) * this._previousCirclesPerRow) || 0) + (this._previousCirclesPerRow);
        this.set.splice(spliceOrigin, 0, ...row); 
    }

    createGrid() {
        this.set.clear();
        for (let i = 0; i < this._circlesPerRow; i++) {
            let row = this.createRow(i);
            this.addRow(i, row, this.set)
        }
    }

    createShadow() {
        this.shadow.remove()
        this.shadowOffset = .2;
        this.set.items.forEach((c, i) => {
            const clone = c.clone()
            const shadowCircle = this.transformIntoShadowCircle(clone, i);
            this.shadow.push(shadowCircle);
        });
    }


    increaseCirclesPerRowByOne() {
        //add circle to each row
        this.moveGrid(this._vMargin/-2, this._hMargin/2);
        for (let i = parseInt(this._previousCirclesPerRow); i > 0; i--) {
            let partialRow = [];
            let y = this.yOrigin + (this._vMargin * (i));            
            let x = this.xOrigin + (this._hMargin * this._previousCirclesPerRow);
            let c = this.createCircle(x, y);
            partialRow.push(c);
            this.addPartialRow(i-1, partialRow);
        }
        // add row
        let row = this.createRow(0)
        this.addRow(0, row, this.set);        
    }

    decreaseCirclesPerRowByOne() {

        let xDelta = this._vMargin/-2
        let yDelta = this._hMargin/-2
        this.moveGrid(xDelta, yDelta);
        
        for (let i = parseInt(this._previousCirclesPerRow); i > 0; i--) {
            const setToRemove = this.set.splice((i*(this._previousCirclesPerRow)), 1)
            setToRemove.remove()
        }
        this.set.splice(0, this._previousCirclesPerRow).remove()   
        
    }
    
    adjustCirclesPerRow() {
        const delta = this._circlesPerRow - this._previousCirclesPerRow;
        if (delta === 0) {
            return null;
        } else if (delta > 0) {
            for (let i = 0; i < delta; i++) {
                this.increaseCirclesPerRowByOne()
            }

        } 
        else {
          this.decreaseCirclesPerRowByOne()
        }
    }

    moveGrid(xDelta, yDelta) {
        this.set.forEach((c) => {
            let x = parseInt(c.attr('cx')) + xDelta
            let y = parseInt(c.attr('cy')) + yDelta
            c.attr('cx', x);
            c.attr('cy', y);
        });
    }
    
    markCenter() {
        const center = this.paper.circle(0,0,.25);
        center.attr({
          stroke: "#E9483B",
          strokeWidth: 0.5,
          fillOpacity: 0
        })
    }
    
    parseAndCheckIntArg (arg, argName) {
        const num = parseInt(arg, 10);
        if (typeof num !== 'number' || isNaN(num))
            throw new TypeError(`${argName} must be a number.`)
        return num
    }
    
    
    parseAndCheckFloatArg (arg, argName) {
        const num = parseFloat(arg, 10);
        if (typeof num !== 'number' || isNaN(num))
            throw new TypeError(`${argName} must be a number.`)
        return num
    }

}
