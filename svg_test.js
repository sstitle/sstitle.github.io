function appendCircle(svgElement, cx, cy, r, fill) {
    // create a circle
    const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttribute("cx", cx);
    newCircle.setAttribute("cy", cy);
    newCircle.setAttribute("r", r);
    newCircle.setAttribute("stroke", "black");
    newCircle.setAttribute("stroke-width", 1);
    newCircle.setAttribute("fill", fill ? "black" : "white");
    svgElement.appendChild(newCircle);
}

const numStrings = 6;
const svgWidth = 350;
const svgHeight = 350;
const gridLength = 300;
const padding = svgWidth - gridLength;

const step = (gridLength - padding) / (numStrings - 1);
const dotSize = step * 0.25;

function appendGrid(svgElement) {
    let lineStrokeWidth = 0.5;
    let stringNames = ["E", "A", "D", "G", "B", "E"];
    for (let i = 0; i < numStrings; i++) {
        let start = padding * 0.5;
        let stop = gridLength - start;
        let value = step * i + start;

        const newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        newText.setAttribute("text-anchor", "middle");
        newText.setAttribute("x", value);
        newText.setAttribute("y", start * 0.5);
        newText.textContent = stringNames[i];
        newText.setAttribute("font-family", "Century Schoolbook L");
        svgElement.appendChild(newText);

        const newVLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        newVLine.setAttribute("x1", value);
        newVLine.setAttribute("y1", start);
        newVLine.setAttribute("x2", value);
        newVLine.setAttribute("y2", stop);
        newVLine.setAttribute("stroke", "grey");
        newVLine.setAttribute("stroke-width", lineStrokeWidth);
        svgElement.appendChild(newVLine);

        const newHLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        newHLine.setAttribute("x1", start);
        newHLine.setAttribute("y1", value);
        newHLine.setAttribute("x2", stop);
        newHLine.setAttribute("y2", value);
        newHLine.setAttribute("stroke", "grey");
        newHLine.setAttribute("stroke-width", lineStrokeWidth);
        svgElement.appendChild(newHLine);
    }
}

function rowToCoord(index) {
    return index * step + padding * 0.5 - step * 0.5;
}

function colToCoord(index) {
    return (index - 1) * step + padding * 0.5;
}

function makeChart(fingerPositions) {
    const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // Set width and height
    newSVG.setAttribute("width", svgWidth);
    newSVG.setAttribute("height", svgHeight);
    // Draw the grid
    appendGrid(newSVG);
    // Draw fingering positions
    for (let i = 0; i < fingerPositions.length; i++) {
        let xCoord = colToCoord(fingerPositions[i][0]);
        let yCoord = rowToCoord(fingerPositions[i][1]);
        appendCircle(newSVG, xCoord, yCoord, dotSize, (i === 0));
    }
    return newSVG;
}

// TODO: Write a chord chart generator function

function render() {
    // Major chords
    document.getElementById("major-root-inv").appendChild(makeChart([[1, 2], [4, 3], [2, 4]]));
    document.getElementById("major-first-inv").appendChild(makeChart([[3, 2], [1, 4], [4, 4]]));
    document.getElementById("major-second-inv").appendChild(makeChart([[4, 5], [1, 3], [3, 2]]));

    // Minor chords
    document.getElementById("minor-root-inv").appendChild(makeChart([[1, 2], [4, 2], [2, 4]]));
    document.getElementById("minor-first-inv").appendChild(makeChart([[3, 2], [1, 3], [4, 4]]));
    document.getElementById("minor-second-inv").appendChild(makeChart([[4, 5], [1, 3], [3, 1]]));

    // Diminished chords
    document.getElementById("dim-root-inv").appendChild(makeChart([[1, 3], [2, 4], [4, 3]]));
    document.getElementById("dim-first-inv").appendChild(makeChart([[3, 2], [1, 3], [4, 3]]));
    document.getElementById("dim-second-inv").appendChild(makeChart([[4, 5], [1, 2], [3, 1]]));

    // Augmented chords
    document.getElementById("aug-root-inv").appendChild(makeChart([[1, 2], [2, 5], [4, 3]]));
    document.getElementById("aug-first-inv").appendChild(makeChart([[2, 5], [1, 2], [4, 3]]));
    document.getElementById("aug-second-inv").appendChild(makeChart([[4, 3], [1, 2], [2, 5]]));

}

render();