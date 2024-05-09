// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Beetle extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/beetle/beetle.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/beetle/beetle.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { Beetle };