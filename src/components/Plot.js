import {generateGrid} from '../utils/Grid'
const math = require('mathjs')

const Plot = ({ size = 500, radius = 50, point }) => {
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

    let grid = generateGrid(1, 10, 100);

 

    const renderPoints = () => {

        function f(z) {
            return math.pow(z, new math.Complex(point[0], point[1]))
        }

        let image  = grid.map(f)
        let points = image.map(z => [z.re, z.im])

        
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

    return (
        <div style={style}>
            <div style={horizontalAxisStyle}></div>
            <div style={verticalAxisStyle}></div>
            {renderPoints()}
        </div>
    );
};

export default Plot;