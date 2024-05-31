import * as THREE from 'three';
//import { Vector2 } from '../libs/three.module';

class Hoja extends THREE.Object3D {
    constructor(material) {
        super();  // Importante llamar al constructor de la superclase primero

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.5, -0.5, 0.5, 0.5, 0, 1);
        shape.bezierCurveTo(-0.5, 0.5, -0.5, -0.5, 0, 0);
        
        const extrudeSettings = {
            steps: 2,
            depth: 0.02,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const leaf = new THREE.Mesh(geometry, material);
        leaf.position.y = 0.6;
        leaf.scale.x = 0.8;
        this.add(leaf);

        const box = new THREE.BoxGeometry(0.015,1,0.015);
        const stem = new THREE.Mesh(box, material);
        stem.position.y = 0.5;

        this.add(stem);
        
    }

    countdown() {
        this.position.y -= 1000;
        setTimeout(() => {
            this.position.y += 1000;
        }, 2000);
    }
}

export { Hoja };
