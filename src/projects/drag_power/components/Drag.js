
import React, { useRef, useEffect, useState } from 'react';

const Drag = ({ size = 500, point, setPoint, radius = 50}) => {
    const offsetRef = useRef({ top: null, left: null });
    const elementRef = useRef(null);
    const [snap, setSnap] = useState(false);

    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            offsetRef.current.top = rect.top;
            offsetRef.current.left = rect.left;
        }
    }, []);

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


    const applySnap = (cartesianPoint) => {
        const nearestIntegralPoint = [
            Math.round(cartesianPoint[0]),
            Math.round(cartesianPoint[1])
        ];

        return nearestIntegralPoint;
    };

    const toggleSnap = () => {
        const newSnapState = !snap;
        setSnap(newSnapState);

        if (newSnapState) {
            const snappedPoint = applySnap(point);
            setPoint(snappedPoint);
        }
    };

    const drawTicks = () => {
        let ticks = [];
        for (let i = -radius; i <= radius; i++) {
            const pixelPos = scale * i + size / 2;
            ticks.push(
                <div key={i} style={{
                    position: 'absolute',
                    left: `${pixelPos}px`,
                    top: '50%',
                    width: '1px',
                    height: '10px',
                    backgroundColor: 'black',
                    transform: 'translate(-50%, -50%)',
                }}></div>
            );
            ticks.push(
                <div key={`y${i}`} style={{
                    position: 'absolute',
                    top: `${pixelPos}px`,
                    left: '50%',
                    width: '10px',
                    height: '1px',
                    backgroundColor: 'black',
                    transform: 'translate(-50%, -50%)',
                }}></div>
            );
        }
        return ticks;
    };

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

    };

    const handleDrag = (e) => {
        e.preventDefault();
        let newPixelPoint = {
            x: Math.min(Math.max(0, e.clientX - offsetRef.current.left), size),
            y: Math.min(Math.max(0, e.clientY - offsetRef.current.top), size)
        };
        setPoint(convertToCartesianCoords(newPixelPoint));
    };

    const handleDragEnd = (currentPixelPoint) => {
        document.removeEventListener('mousemove', handleDrag);

        if (snap) {
            const currentCartesianPoint = convertToCartesianCoords(currentPixelPoint);
            setPoint(applySnap(currentCartesianPoint));
        }
        
    };

    return (
        <div>
            <button onClick={toggleSnap}>Snap: {snap ? "ON" : "OFF"}</button>
            <div ref={elementRef} style={style}>
                {drawTicks()}
                <div style={horizontalAxisStyle}></div>
                <div style={verticalAxisStyle}></div>
                <div
                    style={{ ...pointStyle, top: `${pixelPoint.y}px`, left: `${pixelPoint.x}px` }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        document.addEventListener('mousemove', handleDrag);
                        document.addEventListener('mouseup', (e) => {
                            handleDragEnd({ x: e.clientX - offsetRef.current.left, y: e.clientY - offsetRef.current.top });
                        }, { once: true });
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Drag;
