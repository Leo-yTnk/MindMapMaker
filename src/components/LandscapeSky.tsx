import { useEffect, useRef } from "react";

function createCloudTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const gradient = ctx.createRadialGradient(128, 64, 20, 128, 64, 120);
    gradient.addColorStop(0, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}

export default function LandscapeSky() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let animationId = 0;
        let cleanup: (() => void) | undefined;
        let isUnmounted = false;

        const initialize = async () => {
            const THREE = await import(
                "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js"
            );
            const { Sky } = await import(
                "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/objects/Sky.js"
            );

            if (isUnmounted || !mountRef.current) return;

            const container = mountRef.current;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                60,
                container.clientWidth / container.clientHeight,
                0.1,
                1000,
            );
            camera.position.set(0, 15, 45);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);

            const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
            scene.add(sunLight);

            const sky = new Sky();
            sky.scale.setScalar(450000);
            scene.add(sky);

            const skyUniforms = sky.material.uniforms;
            skyUniforms.turbidity.value = 8;
            skyUniforms.rayleigh.value = 1.2;
            skyUniforms.luminance.value = 1;
            skyUniforms.mieCoefficient.value = 0.0004;
            skyUniforms.mieDirectionalG.value = 0.8;

            const sunPosition = new THREE.Vector3();

            const starGeometry = new THREE.BufferGeometry();
            const starVertices: number[] = [];
            const starCount = 900;
            const radius = 400;

            for (let i = 0; i < starCount; i += 1) {
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = radius + Math.random() * 50;

                starVertices.push(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi),
                );
            }

            starGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(starVertices, 3),
            );

            const starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 2,
                sizeAttenuation: true,
                transparent: true,
                opacity: 0.85,
                depthWrite: false,
            });
            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);

            const sunMesh = new THREE.Mesh(
                new THREE.SphereGeometry(3, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xfff5c4 }),
            );
            scene.add(sunMesh);

            const moonMaterial = new THREE.MeshStandardMaterial({
                color: 0xe8e8ff,
                emissive: 0x222233,
                emissiveIntensity: 0.4,
                roughness: 0.7,
                metalness: 0.05,
                transparent: true,
                opacity: 0.9,
            });
            const moon = new THREE.Mesh(new THREE.SphereGeometry(2.4, 32, 32), moonMaterial);
            scene.add(moon);

            const cloudTexture = createCloudTexture();
            const cloudGroup = new THREE.Group();
            if (cloudTexture) {
                const texture = new THREE.CanvasTexture(cloudTexture);
                for (let i = 0; i < 10; i += 1) {
                    const cloudMaterial = new THREE.MeshLambertMaterial({
                        map: texture,
                        transparent: true,
                        depthWrite: false,
                        opacity: 0.5,
                    });
                    const cloud = new THREE.Mesh(
                        new THREE.PlaneGeometry(24 + Math.random() * 10, 12 + Math.random() * 6),
                        cloudMaterial,
                    );
                    cloud.position.set(
                        Math.random() * 140 - 70,
                        6 + Math.random() * 14,
                        -40 - Math.random() * 20,
                    );
                    cloud.rotation.y = Math.random() * Math.PI;
                    cloudGroup.add(cloud);
                }
                scene.add(cloudGroup);
            }

            const updateSky = () => {
                const now = new Date();
                const hour = now.getHours() + now.getMinutes() / 60;
                const normalizedTime = hour / 24;
                const sunAngle = normalizedTime * Math.PI * 2;

                const sunHeight = Math.sin(sunAngle);
                const dayFactor = THREE.MathUtils.clamp((sunHeight + 1) / 2, 0, 1);

                const inclination = THREE.MathUtils.clamp(0.49 - sunHeight * 0.35, 0, 1);
                const azimuth = normalizedTime;
                const theta = 2 * Math.PI * (azimuth - 0.5);
                const phi = Math.PI * (0.5 - inclination);
                sunPosition.setFromSphericalCoords(1, phi, theta);

                skyUniforms.sunPosition.value.copy(sunPosition);

                sunMesh.position.copy(sunPosition.clone().multiplyScalar(80));
                sunMesh.visible = dayFactor > 0.05;
                sunMesh.material.opacity = Math.max(0.25, dayFactor);

                sunLight.position.copy(sunMesh.position.clone().normalize().multiplyScalar(50));
                sunLight.intensity = 0.6 + dayFactor;
                ambientLight.intensity = 0.25 + 0.55 * dayFactor;

                const moonAngle = sunAngle + Math.PI;
                const moonHeight = Math.sin(moonAngle);
                moon.position.set(
                    Math.cos(moonAngle) * 90,
                    moonHeight * 45,
                    Math.sin(moonAngle) * 90,
                );
                moon.material.opacity = 0.15 + 0.85 * (1 - dayFactor);
                moon.visible = moon.material.opacity > 0.05;

                stars.rotation.y += 0.0005;
                starMaterial.opacity = 0.85 * (1 - dayFactor);

                const clouds = cloudGroup.children as Array<{
                    position: { x: number };
                    material?: { opacity?: number };
                }>;

                clouds.forEach((child, index) => {
                    child.position.x += 0.02 + index * 0.0025;
                    if (child.position.x > 80) child.position.x = -80;

                    const cloudMaterial = child.material;
                    if (cloudMaterial && typeof cloudMaterial === "object") {
                        cloudMaterial.opacity = 0.35 + 0.35 * (1 - Math.abs(dayFactor - 0.5) * 2);
                    }
                });
            };

            const animate = () => {
                updateSky();
                renderer.render(scene, camera);
                animationId = requestAnimationFrame(animate);
            };

            const onResize = () => {
                if (!mountRef.current) return;
                const { clientWidth, clientHeight } = mountRef.current;
                camera.aspect = clientWidth / clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(clientWidth, clientHeight);
            };

            window.addEventListener("resize", onResize);
            animate();

            cleanup = () => {
                isUnmounted = true;
                window.removeEventListener("resize", onResize);
                cancelAnimationFrame(animationId);
                renderer.dispose();
                cloudGroup.clear();
                starGeometry.dispose();
                starMaterial.dispose();
                sky.material.dispose();
                scene.clear();
                if (container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
            };
        };

        initialize();

        return () => {
            isUnmounted = true;
            if (cleanup) {
                cleanup();
            }
        };
    }, []);

    return <div ref={mountRef} className="three-landscape" aria-label="Céu dinâmico animado" />;
}
