import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js';
import { OBJLoader } from '../libs/OBJLoader.js';

class Runa2 extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry();
        this.time = 0;

        // Crear una caja invisible para el raycast
        const boxGeometry = new THREE.BoxGeometry(100, 100, 100); // Tamaño adecuado para cubrir el área de interés
        const boxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }); // Material transparente
        this.raycastBox = new THREE.Mesh(boxGeometry, boxMaterial);
        this.add(this.raycastBox); // Añadir la caja invisible a la escena
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/triskelion/triskelion.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/triskelion/triskelion.obj',
                    (object) => {                       
                        object.scale.set(0.15, 0.15, 0.15);
                        this.add(object);
                    }, null, null);
            });
    }

    update() {
        // Función que hace que el objeto suba y baje continuamente
        this.rotation.y += 0.1;
        this.position.y += Math.sin(this.time) * 0.01;
        this.time += 0.1;
    }

    countdown() {
        // Función para mover el objeto horizontalmente y luego volverlo a colocar después de un cierto tiempo
        this.position.x -= 1000;
        setTimeout(() => {
            this.position.x += 1000;
        }, 2000);
    }
}

export { Runa2 };
