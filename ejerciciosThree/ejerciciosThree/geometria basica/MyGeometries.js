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

class IcoGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);
    }

    // Método para crear la GUI específica del icosaedro
    createGUI(gui, titleGui) {
        // Llama al método createGUI de la clase padre para agregar los controles comunes
        super.createGUI(gui, titleGui);

        // Inicializa las propiedades específicas del icosaedro en guiControlsIco
        this.guiControlsIco = {
            radius: 1.0,
            detail: 0,
        };

        // Agrega controles específicos del icosaedro
        var folder = gui.addFolder(titleGui + ' - Icosaedro');
        folder.add(this.guiControlsIco, 'radius', 0.1, 5.0, 0.01).name('Radio : ').listen();
        folder.add(this.guiControlsIco, 'detail', 0, 10, 1).name('Detalle : ').listen();
    }

    // Método para crear la geometría del icosaedro
    createGeometry() {
        // Verifica si el icosaedro ya existe
        if (this.icoMesh) {
            // Actualiza la geometría del icosaedro con los nuevos parámetros
            this.icoMesh.geometry = new THREE.IcosahedronGeometry(this.guiControlsIco.radius, this.guiControlsIco.detail);

            // Actualiza el material del icosaedro
            this.icoMesh.material.dispose();
            this.icoMesh.material = new THREE.MeshNormalMaterial({ flatShading: true });
        } else {
            // Si el icosaedro no existe, créalo y agrégalo a la escena
            var icoGeom = new THREE.IcosahedronGeometry(this.guiControlsIco.radius, this.guiControlsIco.detail);
            var icoMat = new THREE.MeshNormalMaterial();
            var ico = new THREE.Mesh(icoGeom, icoMat);

            // Agrega el icosaedro a la escena y guarda una referencia a él
            this.add(ico);
            this.icoMesh = ico;
        }
    }

    update() {
        super.update(); // Llamamos al método update de la clase padre para actualizar los controles comunes

        // Llamamos al método para actualizar la geometría del icosaedro
        this.createGeometry();
    }
}

class TorusGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);
    }

    createGUI(gui, titleGui) {
        super.createGUI(gui, titleGui);

        this.guiControlsTorus = {
            radius: 1.0,
            tube: 0.4,
            radialSegments: 12,
            tubularSegments: 48,
            arc: Math.PI * 2
        };

        var folder = gui.addFolder(titleGui + ' - Torus');
        folder.add(this.guiControlsTorus, 'radius', 0.1, 5.0, 0.01).name('Radio: ').listen();
        folder.add(this.guiControlsTorus, 'tube', 0.1, 5.0, 0.01).name('Tubo: ').listen();
        folder.add(this.guiControlsTorus, 'radialSegments', 3, 64, 1).name('Segmentos radiales: ').listen();
        folder.add(this.guiControlsTorus, 'tubularSegments', 3, 64, 1).name('Segmentos tubulares: ').listen();
        folder.add(this.guiControlsTorus, 'arc', 0, Math.PI * 2, 0.01).name('Ángulo central: ').listen();
    }

    createGeometry() {
        if (this.torusMesh) {
            this.torusMesh.geometry = new THREE.TorusGeometry(
                this.guiControlsTorus.radius,
                this.guiControlsTorus.tube,
                this.guiControlsTorus.radialSegments,
                this.guiControlsTorus.tubularSegments,
                this.guiControlsTorus.arc
            );

            this.torusMesh.material.dispose();
            this.torusMesh.material = new THREE.MeshNormalMaterial({ flatShading: true });
        } else {
            var torusGeom = new THREE.TorusGeometry(
                this.guiControlsTorus.radius,
                this.guiControlsTorus.tube,
                this.guiControlsTorus.radialSegments,
                this.guiControlsTorus.tubularSegments,
                this.guiControlsTorus.arc
            );
            var torusMat = new THREE.MeshNormalMaterial();
            var torus = new THREE.Mesh(torusGeom, torusMat);

            this.add(torus);
            this.torusMesh = torus;
        }
    }

    update() {
        super.update();
        this.createGeometry();
    }
}


// Exportamos las clases BoxGeometry y CylinderGeometry
export { BoxGeometry, CylinderGeometry, IcoGeometry, TorusGeometry };
