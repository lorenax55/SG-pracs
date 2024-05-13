// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Scroll extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/scroll/scroll.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/scroll/scroll.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { Scroll };