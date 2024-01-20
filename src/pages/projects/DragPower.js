import React, { useState, useEffect } from 'react';
import Drag from '../../projects/drag_power/components/Drag';
import Plot from '../../projects/drag_power/components/Plot';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Link } from 'react-router-dom';
import Header from '../../Header'


const Couple = () => {
    const [point, setPoint] = useState([1, 0]); // Initial state of the point
    const [size, setSize] = useState(getSize());

    // Function to calculate size based on window width
    function getSize() {
        const width = window.innerWidth;
        const baseSize = 600; // Base size for large screens
        const maxSize = Math.min(baseSize, width - 100); // Ensure component doesn't overflow the screen width
        return maxSize;
    }

    useEffect(() => {
        // Update size when window resizes
        function handleResize() {
            setSize(getSize());
        }

        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log("Current size:", size);


    return (
        <div>
            <Header />
        <div >
            <div style={{
                display: 'flex', 
                flexDirection: 'row',
                height: '80vh',
                width: '100vw',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Drag size={size } radius={5} point={point} setPoint={setPoint}/>
                <Plot size={size } radius={8} point={point} />
            </div>
            <div style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{width: '70%'}}>

                    <h2>Learn More</h2>
                    <p  >
                    For each complex number <InlineMath math={'p'} /> define a map (aka function) <InlineMath math={'*^p \\colon '}/> by 
                    <BlockMath>
                        {'*^p \\colon z \\mapsto z^p.'}
                    </BlockMath>
                    <InlineMath math={'*^p \\colon '}/> is simply the transformation associated with raising a complex number to the <InlineMath math={'p'}/>'th power. Hence, <InlineMath math={'*^2  '}/> 
                    corresponds with squaring, <InlineMath math={'*^3  '}/> with cubing, <InlineMath math={'*^{-1}  '}/> with inversion, and so on. <InlineMath math={'*^i'}/> is less familiar. The red dot on the left plot represents <InlineMath math={'p'}/> and the 
                    right plot is a certain visualization of <InlineMath math={'*^p'}/> and in some ways is like a graph of the function <InlineMath math={'*^p'}/>. For example, for <InlineMath math={'p=2'}/> we see horizontal parabolae, which corresponds
                    to the parabola we see when we graph the real map <InlineMath math={'f(x)=x^2'}/>. Since <InlineMath math={'z^1=z'}/>, <InlineMath math={'*^1'}/> is the identity map, which usually looks like <InlineMath math={'f(x)=x'}/>. 
                    </p>
                    <p>
                        If <InlineMath math={'p=1'}/> we see a simple grid, which is what I'm using to create this animation. The right plot is plotting the points <InlineMath math={'g^p'}/> where <InlineMath math={'g'}/> is 
                        a point on the grid. When <InlineMath math={'p=1'}/> we see the grid itself. When <InlineMath math={'p=2'}/> we see the "square" of the grid, and so on.
                    </p>
                    <InlineMath math={''}/>

                </div>

                    
              
            </div>
        </div>
        </div>
        
    );
};

export default Couple;
