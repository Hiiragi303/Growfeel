import * as THREE from "three";

export function createRain() {
    const rainCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;  // x
        positions[i + 1] = Math.random() * 200;  // y
        positions[i + 2] = (Math.random() - 0.5) * 200;  // z
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xcfe2ff,
        size: 0.12,
        transparent: true,
        opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);

    function update() {
        const pos = geometry.attributes.position.array;
        const speed = 0.5;
        for (let i = 1; i < pos.length; i+= 3) {
            pos[i] -= speed;
            if (pos[i] < 0) {
                pos[i] = 200;
            }
        }
        geometry.attributes.position.needsUpdate = true;
    }

    return {
        mesh: points,
        update,
    };
}