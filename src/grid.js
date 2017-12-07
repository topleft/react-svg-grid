const Snap = window.Snap;

export function createPaper(selector) {
    return Snap(selector);
}

export class Grid {

    /**
    @paper: instance of Snap.svg Paper **already attached to the dom**
    @set: instance of a Snap.svg Set containing all sub elements of the main grid element 
    **/

    constructor(paper, set) {
        if (!(paper && paper.node && paper.node.viewPortElement))
            throw new Error('The paper argument must be an instance of Snap.svg Paper must be attached to a DOM element')
            
        if (!(set && set.type === 'set'))
            throw new Error('The set argument must be an instance of Snap.svg set')

        this.paper = paper;
        this.set = set;
    }

    createSet(Snap) {
        return new Snap.set();
    }

    createSymetricalCirleGrid(circlesPerRow, hMargin, vMargin, radius, color) {
        // make sure that all elements are numbers
        circlesPerRow = parseAndCheckIntArg(circlesPerRow, 'circlesPerRow');
        hMargin = parseAndCheckIntArg(hMargin, 'hMargin');
        vMargin = parseAndCheckIntArg(vMargin, 'vMargin');
        radius = parseAndCheckIntArg(radius, 'radius');
        
        const set = this.set.clear();
        const gridSize = Math.pow(circlesPerRow, 2)
        const diameter = radius * 2;
        const width = hMargin > diameter ? hMargin * circlesPerRow : (hMargin * (circlesPerRow - 1)) + diameter
        const height = vMargin > diameter ? vMargin * circlesPerRow : (vMargin * (circlesPerRow - 1)) + diameter
        const xOrigin = (-width / 2) + radius;
        const yOrigin = (-height / 2) + radius;
        let x = xOrigin;
        let y = yOrigin;
    
        for (let i = 0; i < gridSize; i++) {
            if (i % circlesPerRow === 0 && i !== 0) { // create new row
                x = xOrigin;
                y += vMargin;
            }
            const calculated_x = x + (hMargin * (i % circlesPerRow));
            const c = this.paper.circle(calculated_x, y, radius)
            c.attr({
                stroke: color,
                strokeWidth: 0.6,
                fillOpacity: 0,
            })
            set.push(c);
        }
    
        return set;
    }
}

export function createSymetricalCirleGrid(paper, circlesPerRow, hMargin, vMargin, radius, color) {
    circlesPerRow = parseInt(circlesPerRow, 10);
    hMargin = parseInt(hMargin, 10);
    vMargin = parseInt(vMargin, 10);
    radius = parseInt(radius, 10);
    const set = new Snap.Set();
    const gridSize = Math.pow(circlesPerRow, 2)
    const diameter = radius * 2;
    const width = hMargin > diameter ? hMargin * circlesPerRow : (hMargin * (circlesPerRow - 1)) + diameter
    const height = vMargin > diameter ? vMargin * circlesPerRow : (vMargin * (circlesPerRow - 1)) + diameter
    const xOrigin = (-width / 2) + radius;
    const yOrigin = (-height / 2) + radius;
    let x = xOrigin;
    let y = yOrigin;

    for (let i = 0; i < gridSize; i++) {
        if (i % circlesPerRow === 0 && i !== 0) { // create new row
            x = xOrigin;
            y += vMargin;
        }
        const calculated_x = x + (hMargin * (i % circlesPerRow));
        const c = paper.circle(calculated_x, y, radius)
        c.attr({
            stroke: color,
            strokeWidth: 0.6,
            fillOpacity: 0,
        })
        set.push(c);
    }

    return set;
}

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



function parseAndCheckIntArg (arg, argName) {
    const num = parseInt(arg, 10);
    if (typeof num !== 'number' || isNaN(num))
        throw new TypeError(`${argName} must be a number.`)
    return number
}

function parseAndCheckFloatArg (arg, argName) {
    const num = parseFloat(arg, 10);
    if (typeof num !== 'number' || isNaN(num))
        throw new TypeError(`${argName} must be a number.`)
    return number
}