import * as THREE from 'three';
//import { Vector2 } from '../libs/three.module';

class Spike extends THREE.Object3D {
    constructor(material) {
        super();  // Importante llamar al constructor de la superclase primero

    
        const geometry = new THREE.ConeGeometry( 0.2, 1, 32 ); 
        
        const spike = new THREE.Mesh(geometry, material);
        spike.position.y = 0.6;
        this.add(spike);
        
    }

    countdown() {
        this.position.y -= 1000;
        setTimeout(() => {
            this.position.y += 1000;
        }, 1000);
    }
}

export { Spike };
