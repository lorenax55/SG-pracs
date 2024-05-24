// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class BeeBody extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/bee/beeBody.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/bee/beeBody.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { BeeBody };

class BeeAla extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/bee/BeeAla.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/bee/BeeAla.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { BeeAla };