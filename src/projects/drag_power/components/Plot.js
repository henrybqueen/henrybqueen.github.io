import {generateGrid, generatePolarGrid} from '../utils/Grid'
import React, { useState } from 'react';

const math = require('mathjs')



const Plot = ({ size = 500, radius = 50, point }) => {



    const [polar, setPolar] = useState(false);

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'lightgray',
        position: 'relative',
        border: '1px solid black'
    };

    const axisStyle = {
        position: 'absolute',
        background: 'black'
    };

    const horizontalAxisStyle = {
        ...axisStyle,
        top: '50%',
        left: 0,
        width: '100%',
        height: '1px'
    };

    const verticalAxisStyle = {
        ...axisStyle,
        top: 0,
        left: '50%',
        height: '100%',
        width: '1px'
    };

    const pointStyle = {
        position: 'absolute',
        height: '2px',
        width: '2px',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)'
    };

    let cartesianGrid = generateGrid(1.5, 10, 100);
    let polarGrid = generatePolarGrid(2, 10, 10, 100);

 

    const renderPoints = () => {

        function f(z) {
            return math.pow(z, new math.Complex(point[0], point[1]))
        }

        let image  = polar ? polarGrid.map(f) : cartesianGrid.map(f);
        let points = image.map(z => [z.re, z.im]);

        
        return points.map((p, index) => {
            const [x, y] = p;
            const scale = size / (2 * radius);
            const posX = scale * x + size / 2;
            const posY = size / 2 - scale * y;

            if (posX >= 0 && posX <= size && posY >= 0 && posY <= size) {
                return (
                    <div
                        key={index}
                        style={{ ...pointStyle, top: `${posY}px`, left: `${posX}px` }}
                    ></div>
                );
            }
            return null;
        });
    };

    const togglePolar = () => {
        
        setPolar(!polar);
    };

    return (
        <div>
            <button onClick={togglePolar}>
                Switch to {polar ? 'Cartesian' : 'Polar'}
            </button>

            <div style={style}>
                
                <div style={horizontalAxisStyle}></div>
                <div style={verticalAxisStyle}></div>
                {renderPoints()}
            </div>

        </div>
        
    );
};

export default Plot;