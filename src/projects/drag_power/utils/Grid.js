
import {Complex} from 'mathjs'

export function generateGrid(radius, gridDensity, lineDensity) {

    let grid = [];
    

    // vertical lines
    for (let i = 0; i <= gridDensity; i++) {

        let x = -radius + (i/gridDensity)*2*radius;

        for (let k = 0; k <= lineDensity; k++) {
            
           
            let y = -radius + (k/lineDensity)*2*radius;

            grid.push(new Complex(x, y))
        }
    }

    
    // horizontal lines
    for (let i = 0; i <= gridDensity; i++) {

        let y = -radius + (i/gridDensity)*2*radius;

        for (let k = 0; k <= lineDensity; k++) {
            
           
            let x = -radius + (k/lineDensity)*2*radius;

            grid.push(new Complex(x, y))
        }
    }
    

  return grid;
}

export function generatePolarGrid(maxRadius, numCircles, numRays, lineDensity) {
    let grid = [];

    // Add circles
    for (let i = 0; i <= numCircles; i++) {
        let radius = i / numCircles * maxRadius

        for (let j = 0; j <= lineDensity; j++) {
            let angle = (j / lineDensity) * 2 * Math.PI;
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);

            grid.push(new Complex(x, y));
        }
    }

    // Add rays
    for (let i = 0; i < numRays; i++) {
        let angle = (i / numRays) * 2 * Math.PI;

        for (let j = 0; j <= lineDensity; j++) {
            let radius = (j / lineDensity) * maxRadius;
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);

            // Avoid adding the center more than once
            if (radius !== 0 || i === 0) {
                grid.push(new Complex(x, y));
            }
        }
    }

    return grid;
}

