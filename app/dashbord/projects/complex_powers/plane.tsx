'use client'

import React, { useRef, useEffect } from 'react';
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

void main() {
    vec2 q = position.xy;
    vec2 result = complexPower(q, p);

    gl_Position = vec4(result, 0.0, 1.0);
    gl_PointSize = 2.0;
}
`;

const fragmentShader = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // RGBA
}
`;

const Plane = () => {
    const n = 40;
    const r = 1;
    const numPoints = (2 * n + 1) * (2 * n + 1);
    const points = generateGrid(n, r);
    const ref = useRef();

    const { powa } = useControls({
        powa: {
            value: { x: 3, y: 0 },
        }
    });

    const uniforms = React.useMemo(() => ({
        p: { value: new THREE.Vector2(powa.x, powa.y) }
    }), []);

    useEffect(() => {
        if (ref.current) {
            ref.current.material.uniforms.p.value.set(powa.x, powa.y);
        }
    }, [powa]);

    return (
        <div className="h-96 w-96 bg-white rounded">
            <Canvas orthographic={true} camera={{ near: 0, position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}>
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
        </div>
    );
};

export default Plane;
