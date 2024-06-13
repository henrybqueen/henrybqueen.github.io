'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';

function generateGrid(n: number, r: number) {
    const points = new Float32Array(3 * (2 * n + 1) * (2 * n + 1));
    const scaleFactor = r / n;
    let index = 0;

    for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
            points[index] = i * scaleFactor;
            points[index + 1] = j * scaleFactor;
            points[index + 2] = 0;
            index += 3;
        }
    }

    return points;
}

const vertexShader = `
uniform vec2 p;
uniform float scale;

varying vec3 vColor;

vec2 complexPower(vec2 q, vec2 p) {
    float a = q.x;
    float b = q.y;
    float c = p.x;
    float d = p.y;
    
    // Convert q to polar form: r * e^(i*theta)
    float r = length(q);
    float theta = atan(b, a);
    
    // Compute the power in polar form: (r^c) * e^(i*(c*theta + d*ln(r)))
    float log_r = log(r);
    float arg = c * theta + d * log_r;
    float exp_c_log_r = exp(c * log_r - d * theta);
    
    // Convert back to rectangular form
    return vec2(exp_c_log_r * cos(arg), exp_c_log_r * sin(arg));
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 q = position.xy;
    vec2 result = exp(scale) * complexPower(q, p);

    float angle = atan(q.y, q.x);
    float hue = (angle / (2.0 * 3.141592653589793)) + 0.5; // normalize to [0, 1]
    vColor = hsv2rgb(vec3(hue, 1.0, 1.0));

    gl_Position = vec4(result, 0.0, 1.0);
    gl_PointSize = 2.0; // Adjust this value to change the size of the points
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.0); // RGBA
}
`;



const Plane = () => {

    const canvasRef = useRef();

    const [scale, setScale] = useState(0);

    function handleWheel(e) {

        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const normX = (2 * mouseX - rect.width) / rect.width;
        const normY = (-2 * mouseY + rect.height) / rect.height;

        console.log(`Scroll delta: ${e.deltaY}`);
        console.log(`normalized coordinates: (${normX}, ${normY})`);

        setScale(prev => prev + e.deltaY * 0.005);
    }



    const n = 200;
    const r = 1.0;
    const numPoints = (2 * n + 1) * (2 * n + 1);
    const points = generateGrid(n, r);
    const ref = useRef();

    const { power } = useControls({
        power: {
            value: { x: 1, y: 0 },
        }
    });

    

    const uniforms = useMemo(() => ({
        p: { value: new THREE.Vector2(power.x, power.y) },
        scale: {value: 0}
    }), []);

    useEffect(() => {
        if (ref.current) {
            ref.current.material.uniforms.p.value.set(power.x, power.y);
            ref.current.material.uniforms.scale.value = scale;
        }
    }, [power, scale]);



    return (
        <Canvas className="size-full" orthographic={true} camera={{ near: 0, position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }} 
            ref={canvasRef}
            onWheel={(e) => handleWheel(e)}
            
        >
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={points}
                        count={numPoints}
                        itemSize={3}
                    />
                </bufferGeometry>
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                />
            </points>
        </Canvas>
    );
};

export default Plane;
