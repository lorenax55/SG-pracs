import * as THREE from 'three';

class Tubo extends THREE.Object3D {
    constructor(curve, material) {
        super();  // Importante llamar al constructor de la superclase primero

      
        const tubeGeometry = new THREE.TubeGeometry(curve, 1000, 0.15, 8, true);
        const tube = new THREE.Mesh(tubeGeometry, material); // Declaración de la variable local
        this.add(tube); // 'this' se refiere al objeto Tubo, que hereda de THREE.Object3D
    }
}

export { Tubo };
