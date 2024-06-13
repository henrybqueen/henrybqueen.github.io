'use client'

import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import React from 'react';
import { useRef } from 'react'

interface Vec2 {
    x: number;
    y: number;
}

interface TriangleProps {
    a: Vec2;
    b: Vec2;
    c: Vec2;
}

const vertexShader = `

varying vec3 fragPos;

void main() {

    fragPos = position;

    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `

varying vec3 fragPos;

void main() {

    float x0 = fragPos.x * 2.0;
    float y0 = fragPos.y * 2.0;

    float x = 0.0;
    float y = 0.0;

    int maxIterations = 1000;
    int i = 0;

    float temp = 0.0;

    while (i < maxIterations && (x * x + y * y < 4.0)) {

        temp = x * x * x - 3.0 * x * y * y + x0;

        y = 3.0 * x * x * y - y * y * y + y0;
        x = temp;

        i += 1;
    }

    // Normalize the iteration count to [0, 1]
    float normalizedIterations = float(i) / float(maxIterations);

    // Apply a simple color gradient
    vec3 color;
    if (i == maxIterations) {
        color = vec3(0.0, 0.0, 0.0); // Inside the Mandelbrot set
    } else {
        color = vec3(normalizedIterations, 0.5, 1.0 - normalizedIterations); // Outside the Mandelbrot set
    }

    gl_FragColor = vec4(color, 1.0);
}
`;


function Triangle({ a, b, c }: TriangleProps) {
    const vertices = new Float32Array([
        a.x, a.y, 0,
        b.x, b.y, 0,
        c.x, c.y, 0
    ]);
    

    return (
        <mesh>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={vertices}
                    count={3}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function Page() {

    const ref = useRef<HTMLCanvasElement>(null);

    const uniforms = {
        scale: {value: 0}
    };


    function handleWheel(e: React.WheelEvent) {

        if (ref.current) {

            const rect = ref.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
    
            const normX = (2 * mouseX - rect.width) / rect.width;
            const normY = (-2 * mouseY + rect.height) / rect.height;
    
            console.log(`Scroll delta: ${e.deltaY}`);
            console.log(`normalized coordinates: (${normX}, ${normY})`);

        }

    }



    return (
        <Canvas className="size-full" orthographic={true} camera={{ near: 0, position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }} 
            onWheel = {(e) => handleWheel(e)}
            ref = {ref}
        >
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <Triangle a={{ x: -1, y: 1 }} b={{ x: -1, y: -1 }} c={{ x: 1, y: 1 }} />
            <Triangle a={{ x: 1, y: 1 }} b={{ x: -1, y: -1 }} c={{ x: 1, y: -1 }} />
        </Canvas>
    );
}
