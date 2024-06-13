'use client'
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshPhongMaterial, Mesh, Vector3 } from "three";
import { ReactNode, useRef } from 'react';

import { Text3D } from "@react-three/drei"

function RotatingMesh({ geometry, position }: {geometry: ReactNode, position: Vector3}) {

    const meshRef = useRef<Mesh>(null);

    useFrame(() => {

        if (meshRef.current) {

            meshRef.current.rotation.x += 0.002;
            meshRef.current.rotation.y += 0.002;

        }

    });

    return (
        <mesh ref={meshRef} position={position}>
            {geometry}
            <meshPhongMaterial />
        </mesh>
    );
}

function Animation() {
    const shapes = [
        { geometry: <tetrahedronGeometry args={[1, 0]} />, position: [-6, 0, 0] },
        { geometry: <boxGeometry args={[1, 1, 1]} />, position: [-3, 0, 0] },
        { geometry: <octahedronGeometry args={[1, 0]} />, position: [0, 0, 0] },
        { geometry: <dodecahedronGeometry args={[1, 0]} />, position: [3, 0, 0] },
        { geometry: <icosahedronGeometry args={[1, 0]} />, position: [6, 0, 0] }
    ];

    return (
        <>
            {shapes.map((shape, index) => (
                <RotatingMesh key={index} geometry={shape.geometry} position={new Vector3(shape.position[0], shape.position[1], shape.position[2])} />
            ))}
        </>
    );
}


function Letter({character, index}: {character: string, index: number}) {

    const ref = useRef<Mesh>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += index != 0 ? 0.002 * index : 0.002;
        }
        
    })

    return (
        <Text3D font="/oswald.json" ref={ref} position={[index, 0, 0]}>
            {character}
            <meshNormalMaterial />
        </Text3D>
    )

}


function Name() {
    return (
        <>
            <Letter character="H" index={-2}/>
            <Letter character="E" index={-1}/>
            <Letter character="N" index={0}/>
            <Letter character="R" index={1}/>
            <Letter character="Y" index={2}/>
        </>
    )
}


export default function Hero() {
    return (
        <div className="h-1/2 w-full">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <directionalLight color="red" position={[1, 0, 5]} />
                <directionalLight color="orange" position={[-1, 0, 5]} />
                <Name />
            </Canvas>
        </div>
    );
}
