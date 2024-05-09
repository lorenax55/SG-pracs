import * as THREE from 'three';
import { Beetle } from './Beetle.js'

class PJ extends THREE.Object3D {
    constructor(curve) {
        super();  // Llama al constructor de la superclase

        // Crea una geometría de plano. Los argumentos son ancho y alto.
        //const geometry = new THREE.BoxGeometry(0.05,0.05,0.1);

        // Crea un material básico de color negro
        //const material = new THREE.MeshBasicMaterial({ color: 0x000000 });  // Negro

        // Crea un mesh combinando la geometría y el material
        const mesh = new Beetle();
        
        mesh.position.set(0,0.2,0);
        mesh.scale.set(0.02,0.02,0.02);
        mesh.rotation.y=-Math.PI*0.5;

        // Añade el mesh al objeto 3D (esto mismo, 'this')
        this.add(mesh);
    }
}

export { PJ };