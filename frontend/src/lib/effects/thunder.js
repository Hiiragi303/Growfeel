import * as THREE from "three";

export function createThunder() {
    const light = new THREE.PointLight(0xffffff, 0, 100);
    // light.position.set(
    //     (Math.random() - 0.5) * 30,
    //     20 + Math.random() * 10,
    //     (Math.random() - 0.5) * 30
    // );
    light.position.set(0, 10, 5);

    let timer = 0;
    let cooldown = 60 + Math.random() * 120;

    function update() {
        timer++;

        if (timer == cooldown) { 
            light.intensity = 6;
            console.log("雷ピカッ");
        }

        if (light.intensity <= 0 && timer > cooldown) {
            timer = 0;
            cooldown = 60 + Math.random() * 120;
            // light.position.set(
            //     (Math.random() - 0.5) * 30,
            //     20 + Math.random() * 10,
            //     (Math.random() - 0.5) * 30
            // );
            light.position.set(0, 10, 5);
        }
    }

    return {
        mesh: light,
        update,
    }
}