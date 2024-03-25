// MyGeometries.js

// Importamos las clases necesarias de Three.js
import * as THREE from '../libs/three.module.js';
import { GUI } from '../libs/dat.gui.module.js';

import { AnimatedGeometry } from './AnimatedGeometry.js'

class RevolGeometry extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);

    }

    createGUI(gui, titleGui) {
        super.createGUI(gui, titleGui);

        this.guiControlsRevolve = {
            angle: Math.PI * 2,
            segments: 12,
        };

        var folder = gui.addFolder(titleGui + ' - Revolución');
        folder.add(this.guiControlsRevolve, 'angle', 0, Math.PI * 2, 0.01).name('Ángulo : ').listen();
        folder.add(this.guiControlsRevolve, 'segments', 3, 50, 1).name('Segmentos : ').listen();
    }

    createGeometry() {
        if (this.revolvedMesh) {
            this.revolvedMesh.geometry = new THREE.LatheGeometry(this.generateProfilePoints(), this.guiControlsRevolve.segments, 0, this.guiControlsRevolve.angle);
            this.revolvedMesh.material.dispose();
            this.revolvedMesh.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide });
        } else {
            var points = this.generateProfilePoints();
            var revolvedGeom = new THREE.LatheGeometry(points, this.guiControlsRevolve.segments, 0, this.guiControlsRevolve.angle);
            var revolvedMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
            var revolved = new THREE.Mesh(revolvedGeom, revolvedMat);
            this.add(revolved);
            this.revolvedMesh = revolved;

            // Crear y agregar la visualización del perfil como plano
            var profileGeom = new THREE.ShapeGeometry(new THREE.Shape(points));
            var profileMat = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
            var profileMesh = new THREE.Mesh(profileGeom, profileMat);
            profileMesh.position.set(0, -2, 0); // Ajusta la posición para que el plano esté debajo del cuerpo de revolución
            this.add(profileMesh);
        }
    }


    generateProfilePoints() {
        var points = [];
        for (var i = 0; i < 10; i++) {
            var angle = (i / 10) * Math.PI * 2;
            var radius = i % 2 === 0 ? 0.5 : 0.2;
            var x = Math.cos(angle) * radius;
            var y = Math.sin(angle) * radius;
            points.push(new THREE.Vector2(x, y));
        }
        return points;
    }

    update() {
        super.update();
        this.createGeometry();
    }
}



export { RevolGeometry };
