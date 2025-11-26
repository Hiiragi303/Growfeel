import { useEffect, useRef } from "react";
import * as THREE from "three";
import { weatherPresets } from "../lib/weatherPresets";
import { effectMap, effectFactory } from "../lib/effects/effectMap";

export function SceneCanvas({ weather }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const sunRef = useRef(null);
    const ambientRef = useRef(null);
    const rendererRef = useRef(null);

    const effectsRef = useRef([]);

    const initializedRef = useRef(false);
    console.log("SceneCanvas rendered");

    // 初期化
    useEffect(() => {
        if (!mountRef.current) return;
        if (initializedRef.current) return;
        initializedRef.current = true;

        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(0, 2, 6);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(10, 20, 10);
        scene.add(sun);

        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambient);

        scene.fog = new THREE.Fog(0xffffff, 15, 40);

        //useRefに保管
        sceneRef.current = scene;
        sunRef.current = sun;
        ambientRef.current = ambient;
        rendererRef.current = renderer;

        const animate = () => {
            effectsRef.current.forEach(e => e.update());
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // cleanup
        return () => {
            if (!mountRef.current) return;
            while (mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }
        };
    }, []);

    useEffect(() => {
        const preset = weatherPresets[weather];
        if (!preset) return;

        const scene = sceneRef.current;
        const sun = sunRef.current;
        const ambient = ambientRef.current;
        if (!scene || !sun || !ambient) return;

        scene.background = new THREE.Color(preset.bg);
        sun.intensity = preset.sun.intensity;
        sun.color.set(preset.sun.color);
        ambient.intensity = preset.ambient;

        scene.fog.near = 15;
        scene.fog.far = 40 + preset.fog * 200;

        effectsRef.current.forEach(e => scene.remove(e.mesh));
        effectsRef.current = [];

        const names = effectMap[weather];
        for (const name of names) {
            const factory = effectFactory[name];
            if (!factory) continue;
            const effect = factory();
            scene.add(effect.mesh);
            effectsRef.current.push(effect);
        }
        console.log(effectsRef.current);
    }, [weather]);

    return <div ref={mountRef} className="w-full h-full pointer-events-none" />
}