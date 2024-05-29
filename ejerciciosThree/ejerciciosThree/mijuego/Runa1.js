import * as THREE from 'three';
//import { Vector2 } from '../libs/three.module';

class Runa1 extends THREE.Object3D {
    constructor(material) {
        super();  // Importante llamar al constructor de la superclase primero

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(1, 0);
        shape.lineTo(1, 2);
        shape.lineTo(4, 5);
        shape.lineTo(1, 8);
        shape.lineTo(1, 10);
        shape.lineTo(4, 7);
        shape.lineTo(5, 7);
        shape.lineTo(1, 11);
        shape.lineTo(0, 11);
        shape.lineTo(0, 8);
        shape.lineTo(-3, 5);
        shape.lineTo(0, 2);
        shape.lineTo(0, 0);

        const holePath1 = new THREE.Path();
        holePath1.moveTo(1,3);
        holePath1.lineTo(3,5);
        holePath1.lineTo(1,7);
        holePath1.lineTo(1,3);
        shape.holes.push(holePath1);

        const holePath2 = new THREE.Path();
        holePath2.moveTo(0,3);
        holePath2.lineTo(-2,5);
        holePath2.lineTo(0,7);
        holePath2.lineTo(0,3);
        shape.holes.push(holePath2);
        
        const extrudeSettings = {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const runa = new THREE.Mesh(geometry, material);
        //runa.position.y = 0.6;
        runa.scale.x = 0.8;
        runa.scale.copy( new THREE.Vector3(0.03,0.03,0.03));
        this.add(runa);

        this.time = 0;

    }

    update() {
        //funcion que sube y baja el objeto continuamente
        this.rotation.y += 0.1;
        this.position.y += Math.sin(this.time)*0.01;
        this.time += 0.1;
        
    }
        

    
}

export { Runa1 };
