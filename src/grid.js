const Snap = window.Snap;


export function createPaper(selector) {
    return Snap(selector);
}

export function createSet() {
    return new Snap.set();
}


export class SymetricalCircleGrid {

    /**
    @paper: instance of Snap.svg Paper **already attached to the dom**
    @set: instance of a Snap.svg Set containing all sub elements of the main grid element 
    **/

    constructor(paper, set, circlesPerRow, hMargin, vMargin, radius, strokeColor, strokeWidth) {
        if (!(paper && paper.node))
            throw new Error('The paper argument must be an instance of Snap.svg Paper must be attached to a DOM element')
            
        if (!(set && set.type === 'set'))
            throw new Error('The set argument must be an instance of Snap.svg set')

        this.paper = paper;
        this.set = set;
        
        this._circlesPerRow = this.parseAndCheckIntArg(circlesPerRow, 'circlesPerRow');
        this._hMargin = this.parseAndCheckIntArg(hMargin, 'hMargin');
        this._vMargin = this.parseAndCheckIntArg(vMargin, 'vMargin');
        this._radius = this.parseAndCheckIntArg(radius, 'radius');
        this._strokeWidth = this.parseAndCheckFloatArg(strokeWidth, 'strokeWidth');
        this._strokeColor = strokeColor; // TODO need to right color checker

    }

    set circlesPerRow(circlesPerRow) {
        this._circlesPerRow = this.parseAndCheckIntArg(circlesPerRow, 'circlesPerRow');
    }
    
    set hMargin(hMargin) {
        this._hMargin = this.parseAndCheckIntArg(hMargin, 'hMargin');
    }
            
    set vMargin(vMargin) {
        this._vMargin = this.parseAndCheckIntArg(vMargin, 'vMargin');
    }
            
    set radius(radius) {
        this._radius = this.parseAndCheckIntArg(radius, 'radius');
    }

    set strokeWidth(strokeWidth) {
        this._strokeWidth = this.parseAndCheckIntArg(strokeWidth, 'strokeWidth');
    }

    set strokeColor(strokeColor) {
        this._strokeColor = strokeColor;
    }

    get diameter() {
        return this._radius * 2;
    }

    get totalNumCircles() {
        return Math.pow(this._circlesPerRow, 2)
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

    createSymetricalCirleGrid() {

        let x = this.xOrigin;
        let y = this.yOrigin;
        
        this.set.clear();
        for (let i = 0; i < this.totalNumCircles; i++) {
            if (i % this._circlesPerRow === 0 && i !== 0) { // create new row
                x = this.xOrigin;
                y += this._vMargin;
            }
            const calculated_x = x + (this._hMargin * (i % this._circlesPerRow));
            const c = this.paper.circle(calculated_x, y, this._radius)
            c.attr({
                stroke: this._strokeColor,
                strokeWidth: this._strokeWidth,
                fillOpacity: 0,
            })
            this.set.push(c);
        }
        
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



// export function createSymetricalCirleGrid(paper, circlesPerRow, hMargin, vMargin, radius, color) {
//     circlesPerRow = parseInt(circlesPerRow, 10);
//     hMargin = parseInt(hMargin, 10);
//     vMargin = parseInt(vMargin, 10);
//     radius = parseInt(radius, 10);
//     const set = new Snap.Set();
//     const gridSize = Math.pow(circlesPerRow, 2)
//     const diameter = radius * 2;
//     const width = hMargin > diameter ? hMargin * circlesPerRow : (hMargin * (circlesPerRow - 1)) + diameter
//     const height = vMargin > diameter ? vMargin * circlesPerRow : (vMargin * (circlesPerRow - 1)) + diameter
//     const xOrigin = (-width / 2) + radius;
//     const yOrigin = (-height / 2) + radius;
//     let x = xOrigin;
//     let y = yOrigin;

//     for (let i = 0; i < gridSize; i++) {
//         if (i % circlesPerRow === 0 && i !== 0) { // create new row
//             x = xOrigin;
//             y += vMargin;
//         }
//         const calculated_x = x + (hMargin * (i % circlesPerRow));
//         const c = paper.circle(calculated_x, y, radius)
//         c.attr({
//             stroke: color,
//             strokeWidth: this.strokeWidth,
//             fillOpacity: 0,
//         })
//         set.push(c);
//     }

//     return set;
// }

export function createShaddow(paper, grid) {
    const clone = grid.clone()
    const gridSize = clone.items.length;
    const circlesPerRow = Math.sqrt(gridSize);
    let sizeFactor = 0.1;
    clone.items.forEach((c, i) => {

        if (!((i) % circlesPerRow)) {
            sizeFactor += c.attr('r') / 100
        }
        const newRadius = (parseInt(c.attr('r'), 10) * sizeFactor) + parseInt(c.attr('r'), 10)
        const newX = (parseInt(c.attr('cx'), 10) * sizeFactor) + parseInt(c.attr('cx'), 10)
        c.attr({
            cx: newX,
            r: newRadius,
            transform: "t1,50s",
            strokeOpacity: .5,
            stroke: "#555",
        })
    })
}


// circle grid with shadow

// // uncomment if you need the center point o the paper
// const center = patternPaper.circle(0,0,.25);
// center.attr({
//   stroke: "#E9483B",
//   strokeWidth: .5,
//   fillOpacity: 0
// })
