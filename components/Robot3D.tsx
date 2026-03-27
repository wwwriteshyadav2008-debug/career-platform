import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage, PresentationControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

function Model(props: any) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Bobbing motion
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      // Rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 1.6, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.2, 1.6, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 0.2, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export const Robot3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <color attach="background" args={['#ffffff']} />
        <Suspense fallback={<Loader />}>
          <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="city" intensity={0.6} shadows={false}>
              <Model scale={1} />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
};
