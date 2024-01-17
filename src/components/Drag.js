
import React from 'react';

const Drag = ({ size = 500, point, setPoint, radius = 50 }) => {
    const scale = size / (2 * radius);

    const convertToPixelCoords = (cartesianPoint) => ({
        x: scale * cartesianPoint[0] + size / 2,
        y: size / 2 - scale * cartesianPoint[1],
    });

    const convertToCartesianCoords = (pixelPoint) => ([
        (pixelPoint.x - size / 2) / scale,
        (size / 2 - pixelPoint.y) / scale,
    ]);

    const pixelPoint = convertToPixelCoords(point);

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
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer', // Add cursor style
        top: `${point.y}px`,
        left: `${point.x}px`
    };

    const handleDrag = (e) => {
        e.preventDefault();
        let newPixelPoint = {
            x: Math.min(Math.max(0, e.clientX - e.target.offsetParent.offsetLeft), size),
            y: Math.min(Math.max(0, e.clientY - e.target.offsetParent.offsetTop), size)
        };
        setPoint(convertToCartesianCoords(newPixelPoint));
    };

    return (
        <div style={style}>
            <div style={horizontalAxisStyle}></div>
            <div style={verticalAxisStyle}></div>
            <div
                style={{ ...pointStyle, top: `${pixelPoint.y}px`, left: `${pixelPoint.x}px` }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    document.addEventListener('mousemove', handleDrag);
                    document.addEventListener('mouseup', () => {
                        document.removeEventListener('mousemove', handleDrag);
                    }, { once: true });
                }}
            ></div>
        </div>
    );
};

export default Drag;

