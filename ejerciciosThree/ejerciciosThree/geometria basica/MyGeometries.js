// MyGeometries.js

// Importamos las clases necesarias de Three.js
import * as THREE from '../libs/three.module.js';
import { GUI } from '../libs/dat.gui.module.js';

import { AnimatedGeometry } from './AnimatedGeometry.js'

class BoxGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);
    }

    // Método para crear la geometría de la caja
    createGeometry() {
        var boxGeom = new THREE.BoxGeometry(1, 1, 1);
        var boxMat = new THREE.MeshNormalMaterial({ flatShading: true }); // Establece el sombreado plano
        var box = new THREE.Mesh(boxGeom, boxMat);
        this.add(box);
    }
}

// Clase para geometría de cilindro
class CylinderGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);

    }

    // Método para crear la GUI específica del cilindro
    createGUI(gui, titleGui) {
        // Llama al método createGUI de la clase padre para agregar los controles comunes
        super.createGUI(gui, titleGui);

        // Inicializa las propiedades específicas del cilindro en guiControlsCylinder
        this.guiControlsCylinder = {
            radiusTop: 1.0,
            radiusBottom: 1.0,
            height: 1.0,
            radialSegments: 8,
            heightSegments: 1,
            openEnded: false,
            thetaStart: 0,
            thetaLength: Math.PI * 2
        };

        // Agrega controles específicos del cilindro
        var folder = gui.addFolder(titleGui + ' - Cilindro');
        folder.add(this.guiControlsCylinder, 'radiusTop', 0.1, 5.0, 0.01).name('Radio Superior: ').listen();
        folder.add(this.guiControlsCylinder, 'radiusBottom', 0.1, 5.0, 0.01).name('Radio Inferior: ').listen();
        folder.add(this.guiControlsCylinder, 'height', 0.1, 5.0, 0.01).name('Altura: ').listen();
        folder.add(this.guiControlsCylinder, 'radialSegments', 3, 32, 1).name('Segmentos radiales: ').listen();
        folder.add(this.guiControlsCylinder, 'heightSegments', 1, 32, 1).name('Segmentos de altura: ').listen();
        folder.add(this.guiControlsCylinder, 'openEnded').name('Extremos abiertos: ').listen();
        folder.add(this.guiControlsCylinder, 'thetaStart', 0, Math.PI * 2, 0.01).name('Ángulo de inicio: ').listen();
        folder.add(this.guiControlsCylinder, 'thetaLength', 0, Math.PI * 2, 0.01).name('Longitud del ángulo: ').listen();
    }


    // Método para crear la geometría del cilindro
    createGeometry() {
        // Verifica si el cilindro ya existe
        if (this.cylinderMesh) {
            // Actualiza la geometría del cilindro con los nuevos parámetros
            this.cylinderMesh.geometry = new THREE.CylinderGeometry(
                this.guiControlsCylinder.radiusTop,
                this.guiControlsCylinder.radiusBottom,
                this.guiControlsCylinder.height,
                this.guiControlsCylinder.radialSegments,
                this.guiControlsCylinder.heightSegments,
                this.guiControlsCylinder.openEnded,
                this.guiControlsCylinder.thetaStart,
                this.guiControlsCylinder.thetaLength
            );

            // Actualiza el material del cilindro
            this.cylinderMesh.material.dispose();
            this.cylinderMesh.material = new THREE.MeshNormalMaterial({ flatShading: true });
        } else {
            // Si el cilindro no existe, créalo y agrégalo a la escena
            var cylinderGeom = new THREE.CylinderGeometry(
                this.guiControlsCylinder.radiusTop,
                this.guiControlsCylinder.radiusBottom,
                this.guiControlsCylinder.height,
                this.guiControlsCylinder.radialSegments,
                this.guiControlsCylinder.heightSegments,
                this.guiControlsCylinder.openEnded,
                this.guiControlsCylinder.thetaStart,
                this.guiControlsCylinder.thetaLength
            );
            var cylinderMat = new THREE.MeshNormalMaterial();
            var cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);

            // Agrega el cilindro a la escena y guarda una referencia a él
            this.add(cylinder);
            this.cylinderMesh = cylinder;
        }
    }

    update() {
        super.update(); // Llamamos al método update de la clase padre para actualizar los controles comunes

        // Llamamos al método para actualizar la geometría del cilindro
        this.createGeometry();
    }


}

// Exportamos las clases BoxGeometry y CylinderGeometry
export { BoxGeometry, CylinderGeometry };
