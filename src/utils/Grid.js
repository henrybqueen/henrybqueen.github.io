
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
