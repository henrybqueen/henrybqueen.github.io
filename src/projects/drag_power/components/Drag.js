import React, { useRef, useState } from 'react';

const Drag = ({ size = 500, point, setPoint, radius = 50 }) => {
    const elementRef = useRef(null);
    const [snap, setSnap] = useState(false);

    const convertToPixelCoords = (cartesianPoint) => ({
        x: scale * cartesianPoint[0] + size / 2,
        y: size / 2 - scale * cartesianPoint[1],
    });

    const convertToCartesianCoords = (pixelPoint) => ([
        (pixelPoint.x - size / 2) / scale,
        (size / 2 - pixelPoint.y) / scale,
    ]);

    const scale = size / (2 * radius);
    const pixelPoint = convertToPixelCoords(point);

    const applySnap = (cartesianPoint) => [
        Math.round(cartesianPoint[0]),
        Math.round(cartesianPoint[1])
    ];

    const toggleSnap = () => {
        const newSnapState = !snap;
        setSnap(newSnapState);
        if (newSnapState) {
            setPoint(applySnap(point));
        }
    };

    const drawTicks = () => {
        let ticks = [];
        for (let i = -radius; i <= radius; i++) {
            const pixelPos = scale * i + size / 2;
            ticks.push(
                <div key={i} style={tickStyle(pixelPos, true)}></div>,
                <div key={`y${i}`} style={tickStyle(pixelPos, false)}></div>
            );
        }
        return ticks;
    };

    const tickStyle = (pixelPos, isHorizontal) => ({
        position: 'absolute',
        [isHorizontal ? 'left' : 'top']: `${pixelPos}px`,
        [isHorizontal ? 'top' : 'left']: '50%',
        width: isHorizontal ? '1px' : '10px',
        height: isHorizontal ? '10px' : '1px',
        backgroundColor: 'black',
        transform: 'translate(-50%, -50%)',
    });

    const axisStyle = (isHorizontal) => ({
        position: 'absolute',
        background: 'black',
        [isHorizontal ? 'top' : 'left']: '50%',
        [isHorizontal ? 'left' : 'top']: 0,
        [isHorizontal ? 'width' : 'height']: '100%',
        [isHorizontal ? 'height' : 'width']: '1px'
    });

    const pointStyle = {
        position: 'absolute',
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
    };

    const handleDrag = (e) => {
        e.preventDefault();
        const rect = elementRef.current.getBoundingClientRect();
        let newPixelPoint = {
            x: Math.min(Math.max(0, e.clientX - rect.left), size),
            y: Math.min(Math.max(0, e.clientY - rect.top), size)
        };
        setPoint(convertToCartesianCoords(newPixelPoint));
    };

    const handleDragEnd = (e) => {
        document.removeEventListener('mousemove', handleDrag);
        const rect = elementRef.current.getBoundingClientRect();
        let currentPixelPoint = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        if (snap) {
            const currentCartesianPoint = convertToCartesianCoords(currentPixelPoint);
            setPoint(applySnap(currentCartesianPoint));
        }
    };

    return (
        <div>
            <button onClick={toggleSnap}>Snap: {snap ? "ON" : "OFF"}</button>
            <div ref={elementRef} style={{ width: `${size}px`, height: `${size}px`, backgroundColor: 'lightgray', position: 'relative', border: '1px solid black' }}>
                {drawTicks()}
                <div style={axisStyle(true)}></div>
                <div style={axisStyle(false)}></div>
                <div
                    style={{ ...pointStyle, top: `${pixelPoint.y}px`, left: `${pixelPoint.x}px` }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        document.addEventListener('mousemove', handleDrag);
                        document.addEventListener('mouseup', handleDragEnd, { once: true });
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Drag;
