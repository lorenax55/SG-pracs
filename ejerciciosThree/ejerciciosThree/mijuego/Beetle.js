import * as THREE from '../libs/three.module.js';
import { MTLLoader } from '../libs/MTLLoader.js';
import { OBJLoader } from '../libs/OBJLoader.js';

class Beetle extends THREE.Object3D {
    constructor() {
        super();
        this.material = null; // Inicializar el material como null
        this.beetle = null; // Para almacenar el objeto del escarabajo
        this.hat = null; // Para almacenar el objeto del gorrito
        this.createGeometry();
    }

    createGeometry() {
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        // Cargar el modelo del escarabajo
        materialLoader.load('../models/beetle/beetleTexture.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/beetle/beetleTexture.obj',
                    (object) => {
                        this.beetle = object;
                        this.add(object);
                        if (object.children.length > 0) {
                            this.material = object.children[0].material;
                        }
                    }, null, null);
            });

        // Cargar el modelo del gorrito
        var materialLoader2 = new MTLLoader();
        var objectLoader2 = new OBJLoader();
        materialLoader2.load('../models/beetle/gorrito.mtl',
            (materials2) => {
                objectLoader2.setMaterials(materials2);
                objectLoader2.load('../models/beetle/gorrito.obj',
                    (object2) => {
                        this.add(object2);
                    }, null, null);
            });
        
            
    }

    get_material() {
        return this.material;
    }

    change_material(newMaterial) {
        // Asignar el nuevo material solo al escarabajo
        if (this.beetle) {
            this.beetle.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = newMaterial;
                }
            });
        }
    }
}

export { Beetle };
