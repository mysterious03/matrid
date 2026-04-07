import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function Box({ position, color, delay }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + delay;
    mesh.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
    mesh.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[0.9, 0.4, 0.9]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8} 
        roughness={0.2} 
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Grid() {
  const boxes = useMemo(() => {
    const temp = [];
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        const isOrigin = x === 0 && z === 0;
        temp.push({
          id: `${x}-${z}`,
          position: [x, 0, z],
          color: isOrigin ? '#00f2ff' : '#1e293b',
          delay: Math.random() * 10
        });
      }
    }
    return temp;
  }, []);

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {boxes.map((box) => (
        <Box key={box.id} {...box} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#050505" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function IsometricGrid() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [5, 5, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Grid />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
