import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Runa2 extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/triskelion/triskelion.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/triskelion/triskelion.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { Runa2 };
