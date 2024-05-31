import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Runa2 extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
        this.time = 0;

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
        //funcion que sube y baja el objeto continuamente
        this.rotation.y += 0.1;
        this.position.y += Math.sin(this.time)*0.01;
        this.time += 0.1;
        
    }
    countdown() {
        this.position.y -= 1000;
        setTimeout(() => {
            this.position.y += 1000;
        }, 1000);
    }

}

export { Runa2 };
