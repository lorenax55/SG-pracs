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
        var boxMat = new THREE.MeshNormalMaterial();
        var box = new THREE.Mesh(boxGeom, boxMat);
        this.add(box);
    }
}

// Clase para geometría de cilindro
class CylinderGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);

        // Inicializamos la variable de instancia para almacenar la referencia al cilindro
        this.cylinderMesh = null;

        // Creamos la geometría inicial
        this.createGeometry();
    }

    createGUI(gui, titleGui) {
        // Llamamos al método createGUI de la clase padre para agregar los controles comunes
        super.createGUI(gui, titleGui);

        // Agregamos controles adicionales específicos para el cilindro
        var folder = gui.addFolder(titleGui + ' - Cilindro');
        folder.add(this.guiControls, 'radiusTop', 0.1, 5.0, 0.01).name('Radio Superior: ').listen();
        folder.add(this.guiControls, 'radiusBottom', 0.1, 5.0, 0.01).name('Radio Inferior: ').listen();
        folder.add(this.guiControls, 'height', 0.1, 5.0, 0.01).name('Altura: ').listen();
        folder.add(this.guiControls, 'radialSegments', 3, 32, 1).name('Segmentos radiales: ').listen();
        folder.add(this.guiControls, 'heightSegments', 1, 32, 1).name('Segmentos de altura: ').listen();
        folder.add(this.guiControls, 'openEnded').name('Extremos abiertos: ').listen();
        folder.add(this.guiControls, 'thetaStart', 0, Math.PI * 2, 0.01).name('Ángulo de inicio: ').listen();
        folder.add(this.guiControls, 'thetaLength', 0, Math.PI * 2, 0.01).name('Longitud del ángulo: ').listen();
    }

    createGeometry() {
        // Creamos la geometría del cilindro con los parámetros de los controles
        var cylinderGeom = new THREE.CylinderGeometry(
            this.guiControls.radiusTop,
            this.guiControls.radiusBottom,
            this.guiControls.height,
            this.guiControls.radialSegments,
            this.guiControls.heightSegments,
            this.guiControls.openEnded,
            this.guiControls.thetaStart,
            this.guiControls.thetaLength
        );

        // Eliminamos la geometría actual si ya existe
        if (this.cylinderMesh && this.cylinderMesh.geometry) {
            this.cylinderMesh.geometry.dispose();
        }

        // Creamos el cilindro o actualizamos la geometría si ya existe
        if (this.cylinderMesh) {
            this.cylinderMesh.geometry = cylinderGeom;
        } else {
            var cylinderMat = new THREE.MeshNormalMaterial();
            var cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
            this.add(cylinder);
            this.cylinderMesh = cylinder;
        }
    }

    // Método para actualizar la geometría del cilindro
    update() {
        super.update(); // Llamamos al método update de la clase padre para actualizar los controles comunes

        // Actualizamos la geometría con los nuevos valores de los controles
        this.createGeometry();
    }
}


// Exportamos las clases BoxGeometry y CylinderGeometry
export { BoxGeometry, CylinderGeometry };
