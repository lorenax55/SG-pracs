// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { CSG } from '../libs/CSG-v2.js'; // Asegúrate de que la ruta sea correcta

class Taza extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        //material para todo
        var material = new THREE.MeshNormalMaterial();

        var cylinderGeom1 = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 12, 10, false, Math.PI * 2, Math.PI * 2);
        var cylinderGeom2 = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12, 10, false, Math.PI * 2, Math.PI * 2);
        var toro = new THREE.TorusGeometry(0.065, 0.015, 12, 48, Math.PI*2);

        cylinderGeom2.translate(0, 0.01, 0);
        toro.translate(0.1,0,0);

        var cylinder1Mesh = new THREE.Mesh(cylinderGeom1, material);
        var cylinder2Mesh = new THREE.Mesh(cylinderGeom2, material);
        var toroMesh = new THREE.Mesh(toro, material);

        var csg = new CSG();
        csg.union([cylinder1Mesh,toroMesh]);
        csg.subtract([cylinder2Mesh]);

        var resultadoMesh = csg.toMesh();

        this.add(resultadoMesh);
        
    }
}

export { Taza };