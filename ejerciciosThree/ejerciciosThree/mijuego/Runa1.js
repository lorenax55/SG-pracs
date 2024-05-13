import * as THREE from 'three';
//import { Vector2 } from '../libs/three.module';

class Runa1 extends THREE.Object3D {
    constructor(material) {
        super();
        const path = new THREE.Path();

        path.lineTo( 0, 95 );
        path.lineTo( 0.05, 0.1 );
        path.lineTo( 0.1, 0.95 );
        path.lineTo( 0.3, 0.8 );
		

		// Define la forma que deseas extruir
		var radius = 1; // Radio del tubo
		var segments = 100; // Número de segmentos a lo largo del tubo
		var closed = false; // Indica si el tubo está cerrado alrededor del camino

		// Crea la geometría del tubo siguiendo la trayectoria
		var tubeGeometry = new THREE.TubeGeometry(path, segments, radius, 8, closed);

        const mesh = new THREE.Mesh(tubeGeometry, material);
        this.add(mesh);
        
    }
}

export { Runa1 };
