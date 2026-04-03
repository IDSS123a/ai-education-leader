import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, connections, nodeColors } = useMemo(() => {
    const count = 60;
    const radius = 2.8;
    const pos: number[] = [];
    const cols: number[] = [];
    const primaryColor = new THREE.Color("hsl(210, 82%, 45%)");
    const accentColor = new THREE.Color("hsl(160, 64%, 45%)");

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const jitter = 0.15;
      pos.push(
        radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * jitter,
        radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * jitter,
        radius * Math.cos(phi) + (Math.random() - 0.5) * jitter
      );
      const c = Math.random() > 0.3 ? primaryColor : accentColor;
      cols.push(c.r, c.g, c.b);
    }

    // Build connections between nearby nodes
    const conns: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.8) {
          conns.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      connections: new Float32Array(conns),
      nodeColors: new Float32Array(cols),
    };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeColors.length / 3}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="hsl(210, 82%, 50%)"
          transparent
          opacity={0.12}
        />
      </lineSegments>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="hsl(210, 82%, 55%)" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="hsl(160, 64%, 50%)" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function FloatingRing({ radius, speed, color, opacity }: { radius: number; speed: number; color: string; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

export function HeroGlobe() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <NetworkNodes />
        </Float>
        <FloatingRing radius={3.2} speed={0.15} color="hsl(210, 82%, 50%)" opacity={0.08} />
        <FloatingRing radius={3.5} speed={-0.1} color="hsl(160, 64%, 45%)" opacity={0.06} />
      </Canvas>
    </div>
  );
}
