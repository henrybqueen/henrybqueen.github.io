import React, { useState } from 'react';
import Drag from './Drag';
import Plot from './Plot';

const Couple = () => {
    const [point, setPoint] = useState([1, 0]); // Initial state of the point


    return (
        <div style={{display: 'flex', 
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'space-around'}}>
            <Drag size={600} radius={5 } point={point} setPoint={setPoint}/>
            <Plot size={600} radius = {8} point={point} />
        </div>
    );
};

export default Couple;
