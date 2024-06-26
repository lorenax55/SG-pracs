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
            //this.revolvedMesh.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide });
            this.revolvedMesh.material = new THREE.MeshStandardMaterial({
                color: 0xFF0000, // Color rojo
                roughness: 0.2, // Baja rugosidad para una superficie más brillante
                metalness: 0.6, // Alta metalicidad para un aspecto más brillante y metálico
                flatShading: false
            });

        } else {
            var revolvedGeom = new THREE.LatheGeometry(this.generateProfilePoints(), this.guiControlsRevolve.segments, 0, this.guiControlsRevolve.angle);

            //var revolvedMat = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide });
            var revolvedMat = new THREE.MeshStandardMaterial({
                color: 0xFF0000, // Color rojo
                roughness: 0.2, // Baja rugosidad para una superficie más brillante
                metalness: 0.6, // Alta metalicidad para un aspecto más brillante y metálico
                flatShading: false
            });

            var revolved = new THREE.Mesh(revolvedGeom, revolvedMat);
            this.add(revolved);

            this.revolvedMesh = revolved;

        }

    }


    generateProfilePoints() {
        var points = [];
        for (var i = 0; i < 10; i++) {
            var angle = (i / 10) * Math.PI * 2;
            var radius = i % 2 === 0 ? 0.5 : 0.2;
            var x = Math.cos(angle) * radius +4;
            var y = Math.sin(angle) * radius ;
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
