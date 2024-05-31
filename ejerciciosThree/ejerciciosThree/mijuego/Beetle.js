import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js';
import { OBJLoader } from '../libs/OBJLoader.js';

class Beetle extends THREE.Object3D {
    constructor() {
        super();
        this.material = null; // Inicializar el material como null
        this.createGeometry();
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
                        if (object.children.length > 0) {
                            // Asignar el material del primer hijo
                            this.material = object.children[0].material;
                        }
                    }, null, null);
            });
    }

    get_material() {
        return this.material;
    }

    change_material(newMaterial) {
        // Iterate over all children and assign the new material
        this.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = newMaterial;
            }
        });
    }
    
}

export { Beetle };
