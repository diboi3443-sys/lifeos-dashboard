'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════
   3D AVATAR — Stylized Male Figure
   Level-based visual progression
   ═══════════════════════════════════════════════ */

const LEVEL_THEMES = {
    1: { body: '#8899aa', aura: '#3b82f6', emissive: 0.15, particles: false, title: 'Новичок' },
    3: { body: '#7088a0', aura: '#22c55e', emissive: 0.2, particles: false, title: 'Ученик' },
    5: { body: '#506880', aura: '#8b5cf6', emissive: 0.3, particles: true, title: 'Воин' },
    7: { body: '#3a5070', aura: '#f97316', emissive: 0.4, particles: true, title: 'Мастер' },
    9: { body: '#2a3a55', aura: '#eab308', emissive: 0.6, particles: true, title: 'Легенда' },
};

function getTheme(level: number) {
    if (level >= 9) return LEVEL_THEMES[9];
    if (level >= 7) return LEVEL_THEMES[7];
    if (level >= 5) return LEVEL_THEMES[5];
    if (level >= 3) return LEVEL_THEMES[3];
    return LEVEL_THEMES[1];
}

/* ── Human Body ── */
function HumanBody({ level }: { level: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const theme = getTheme(level);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(theme.body),
        roughness: 0.4,
        metalness: 0.4,
        emissive: new THREE.Color(theme.aura),
        emissiveIntensity: theme.emissive,
    }), [theme]);

    const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(theme.aura),
        roughness: 0.2,
        metalness: 0.8,
        emissive: new THREE.Color(theme.aura),
        emissiveIntensity: 0.4,
    }), [theme]);

    return (
        <group ref={groupRef} position={[0, -0.3, 0]}>
            <mesh position={[0, 1.65, 0]} material={bodyMaterial}>
                <sphereGeometry args={[0.14, 32, 32]} />
            </mesh>
            <mesh position={[0, 1.48, 0]} material={bodyMaterial}>
                <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
            </mesh>
            <mesh position={[0, 1.25, 0]} material={bodyMaterial}>
                <boxGeometry args={[0.36, 0.35, 0.18]} />
            </mesh>
            <mesh position={[0, 0.98, 0]} material={bodyMaterial}>
                <boxGeometry args={[0.3, 0.2, 0.15]} />
            </mesh>
            <mesh position={[-0.22, 1.38, 0]} material={accentMaterial}>
                <sphereGeometry args={[0.06, 16, 16]} />
            </mesh>
            <mesh position={[0.22, 1.38, 0]} material={accentMaterial}>
                <sphereGeometry args={[0.06, 16, 16]} />
            </mesh>
            <mesh position={[-0.26, 1.15, 0]} rotation={[0, 0, 0.15]} material={bodyMaterial}>
                <capsuleGeometry args={[0.04, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[0.26, 1.15, 0]} rotation={[0, 0, -0.15]} material={bodyMaterial}>
                <capsuleGeometry args={[0.04, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[-0.3, 0.82, 0.02]} rotation={[0.1, 0, 0.08]} material={bodyMaterial}>
                <capsuleGeometry args={[0.035, 0.3, 8, 16]} />
            </mesh>
            <mesh position={[0.3, 0.82, 0.02]} rotation={[0.1, 0, -0.08]} material={bodyMaterial}>
                <capsuleGeometry args={[0.035, 0.3, 8, 16]} />
            </mesh>
            <mesh position={[-0.32, 0.63, 0.03]} material={bodyMaterial}>
                <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            <mesh position={[0.32, 0.63, 0.03]} material={bodyMaterial}>
                <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            <mesh position={[-0.09, 0.65, 0]} material={bodyMaterial}>
                <capsuleGeometry args={[0.055, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[0.09, 0.65, 0]} material={bodyMaterial}>
                <capsuleGeometry args={[0.055, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[-0.09, 0.3, 0]} material={bodyMaterial}>
                <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[0.09, 0.3, 0]} material={bodyMaterial}>
                <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
            </mesh>
            <mesh position={[-0.09, 0.08, 0.03]} material={bodyMaterial}>
                <boxGeometry args={[0.08, 0.04, 0.14]} />
            </mesh>
            <mesh position={[0.09, 0.08, 0.03]} material={bodyMaterial}>
                <boxGeometry args={[0.08, 0.04, 0.14]} />
            </mesh>
            <mesh position={[0, 0.88, 0]} material={accentMaterial}>
                <boxGeometry args={[0.32, 0.03, 0.17]} />
            </mesh>
            {level >= 5 && (
                <mesh position={[0, 1.3, 0.1]} material={accentMaterial}>
                    <dodecahedronGeometry args={[0.04, 0]} />
                </mesh>
            )}
        </group>
    );
}

/* ── Aura Ring ── */
function AuraRing({ level }: { level: number }) {
    const ringRef = useRef<THREE.Mesh>(null);
    const theme = getTheme(level);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    if (level < 5) return null;

    return (
        <mesh ref={ringRef} position={[0, 0.3, 0]}>
            <torusGeometry args={[0.5, 0.008, 16, 64]} />
            <meshStandardMaterial
                color={theme.aura}
                emissive={theme.aura}
                emissiveIntensity={1}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
}

/* ── Energy Particles ── */
function EnergyParticles({ level }: { level: number }) {
    const particlesRef = useRef<THREE.Points>(null);
    const theme = getTheme(level);
    const particleCount = level >= 9 ? 80 : level >= 7 ? 50 : 30;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 0.4 + Math.random() * 0.4;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = (Math.random() - 0.3) * 1.5;
            pos[i * 3 + 2] = Math.sin(angle) * radius;
        }
        return pos;
    }, [particleCount]);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            const posAttr = particlesRef.current.geometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                const y = posAttr.getY(i);
                posAttr.setY(i, y + Math.sin(state.clock.elapsedTime + i * 0.5) * 0.002);
            }
            posAttr.needsUpdate = true;
        }
    });

    if (!theme.particles) return null;

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color={theme.aura}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

/* ── 3D Scene ── */
function Scene({ level }: { level: number }) {
    const theme = getTheme(level);
    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <directionalLight position={[-3, 3, -3]} intensity={1} color="#8b5cf6" />
            <pointLight position={[0, 2, 0]} intensity={1.5} color={theme.aura} />
            <pointLight position={[0, -1, 2]} intensity={0.5} color="#3b82f6" />
            <pointLight position={[2, 0, 2]} intensity={0.8} color="#ffffff" />
            <hemisphereLight args={['#6688bb', '#1a1a2e', 0.8]} />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <group scale={1.0} position={[0, -0.9, 0]}>
                    <HumanBody level={level} />
                    <AuraRing level={level} />
                    <EnergyParticles level={level} />
                </group>
            </Float>

            <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.5}
                scale={4}
                blur={2.5}
                color={theme.aura}
            />

            <OrbitControls
                target={[0, 0.2, 0]}
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

/* ── Error Boundary ── */
class AvatarErrorBoundary extends React.Component<
    { children: React.ReactNode; level: number },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; level: number }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            const theme = getTheme(this.props.level);
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="text-6xl mb-3">🧘</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">Уровень {this.props.level}</div>
                        <div className="text-lg font-black" style={{ color: theme.aura }}>{theme.title}</div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

/* ── Main Component ── */
export default function Avatar3D({ level, className = '' }: { level: number; className?: string }) {
    const theme = getTheme(level);

    return (
        <div className={`relative ${className}`} style={{ width: '100%', height: '100%', minHeight: 300 }}>
            <AvatarErrorBoundary level={level}>
                <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                        <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                }>
                    <Canvas
                        camera={{ position: [0, 0.2, 3.8], fov: 45 }}
                        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
                        style={{ background: 'transparent' }}
                        onCreated={({ gl }) => {
                            gl.setClearColor(0x000000, 0);
                            gl.toneMapping = THREE.ACESFilmicToneMapping;
                            gl.toneMappingExposure = 1.2;
                        }}
                    >
                        <Scene level={level} />
                    </Canvas>
                </Suspense>
            </AvatarErrorBoundary>
        </div>
    );
}
