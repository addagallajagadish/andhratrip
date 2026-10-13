import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MapPin, Compass, Navigation } from 'lucide-react';

export default function FloatingLocationPin3D() {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [activeLocation, setActiveLocation] = useState('Araku Valley Ghats');
  const [webglSupported, setWebglSupported] = useState(true);

  const locations = [
    { name: 'Araku Valley Ghats', alt: '1,300m elevation', status: 'Optimal SUV Route' },
    { name: 'Gandikota Canyon', alt: 'Red Gorge Viewpoint', status: 'Off-road Trail Ready' },
    { name: 'Vizag Coast Highway', alt: 'Beachline Drive', status: 'Scenic Cruiser Road' },
    { name: 'Lambasingi Mist Trail', alt: 'Foggy Forest Pass', status: 'Chilly Morning Drive' }
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const width = currentMount.clientWidth || 240;
    const height = currentMount.clientHeight || 240;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5.5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Pin Group
    const pinGroup = new THREE.Group();
    scene.add(pinGroup);

    // Pin Head (Sphere)
    const headGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e4030,
      emissive: 0x84cc16,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.2,
    });
    const pinHead = new THREE.Mesh(headGeo, pinMaterial);
    pinHead.position.y = 0.5;
    pinGroup.add(pinHead);

    // Inner Glowing Core (Location Gem)
    const coreGeo = new THREE.OctahedronGeometry(0.35, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.5;
    pinGroup.add(coreMesh);

    // Pin Cone Tip
    const coneGeo = new THREE.ConeGeometry(0.7, 1.2, 32);
    const coneMesh = new THREE.Mesh(coneGeo, pinMaterial);
    coneMesh.rotation.x = Math.PI;
    coneMesh.position.y = -0.2;
    pinGroup.add(coneMesh);

    // Pulsing Beacon Ring below Pin
    const ringGeo = new THREE.RingGeometry(0.4, 1.1, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.1;
    scene.add(ringMesh);

    // Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x041a13,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = -1.12;
    scene.add(shadowMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa3e635, 3, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0x0e4030, 2, 8);
    backLight.position.set(-2, -1, -2);
    scene.add(backLight);

    // Animation variables
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Floating bobbing motion
      pinGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.15;
      
      // Continuous rotation
      pinGroup.rotation.y = elapsedTime * 0.9;
      coreMesh.rotation.y = -elapsedTime * 1.5;
      coreMesh.rotation.x = elapsedTime * 0.8;

      // Pulse ring expansion
      const ringScale = 1 + (Math.sin(elapsedTime * 3) + 1) * 0.25;
      ringMesh.scale.set(ringScale, ringScale, 1);
      ringMat.opacity = 0.5 - (ringScale - 1) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const cycleLocation = () => {
    const currentIndex = locations.findIndex(l => l.name === activeLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setActiveLocation(locations[nextIndex].name);
  };

  const currentDetails = locations.find(l => l.name === activeLocation) || locations[0];

  return (
    <div 
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={cycleLocation}
      title="Click to cycle scenic road trip coordinates"
    >
      {/* 3D Canvas Box or CSS Fallback */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
        {webglSupported ? (
          <div ref={mountRef} className="w-full h-full" />
        ) : (
          /* CSS 3D Pin Fallback if WebGL unavailable */
          <div className="relative flex flex-col items-center animate-float">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-800 to-lime-500 p-1 shadow-lg shadow-lime-500/20 flex items-center justify-center border-2 border-lime-400">
              <MapPin className="w-8 h-8 text-cream-100 animate-bounce" />
            </div>
            <div className="w-12 h-2 bg-emerald-950/80 rounded-full blur-xs mt-2" />
          </div>
        )}

        {/* Ambient Lime Glow behind Canvas */}
        <div className="absolute inset-0 bg-lime-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-lime-400/20 transition-all duration-500" />
      </div>

      {/* Floating Interactive Badge */}
      <div className="mt-[-10px] glass-panel px-4 py-2 rounded-full border border-lime-400/30 flex items-center gap-2 shadow-xl backdrop-blur-md hover:border-lime-400/70 transition-all">
        <div className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping" />
        <span className="text-xs font-semibold tracking-wider text-cream-100 uppercase flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-lime-400 inline" />
          {currentDetails.name}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 font-mono">
          3D PIN
        </span>
      </div>

      {/* Subtext info */}
      <div className="text-[11px] text-cream-300/80 mt-1 font-mono tracking-tight flex items-center gap-1.5">
        <span>{currentDetails.alt}</span>
        <span>•</span>
        <span className="text-lime-400 font-medium">{currentDetails.status}</span>
      </div>
    </div>
  );
}
