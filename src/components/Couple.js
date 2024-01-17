import React, { useState } from 'react';
import Drag from './Drag';
import Plot from './Plot';

const Couple = () => {
    const [point, setPoint] = useState([1, 0]); // Initial state of the point


    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Drag radius={10 }point={point} setPoint={setPoint}/>
            <Plot radius = {10} point={point} />
        </div>
    );
};

export default Couple;
