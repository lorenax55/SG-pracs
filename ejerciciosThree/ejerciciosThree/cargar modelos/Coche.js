// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/porsche911/911.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
        
    }
}

export { Coche };