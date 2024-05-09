// JavaScript source code
import * as THREE from '../libs/three.module.js';
import { CSG } from '../libs/CSG-v2.js'; // Asegúrate de que la ruta sea correcta

class Pieza extends THREE.Object3D {
    constructor() {
        super();
        this.createGeometry()
    }

    createGeometry() {
        //material para todo
        var material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
        //material.side = THREE.DoubleSide;
        
        var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 0.10);
        shape.lineTo(0.05, 0.10);
        //shape.bezierCurveTo(0.05, 0.1, 0.05, 0.0,0.05,0);
        shape.lineTo(0.075, 0.09);
        shape.lineTo(0.09, 0.075);
        shape.lineTo(0.1, 0.05);
        shape.lineTo(0.1, 0);
        shape.lineTo(0.0, 0);
        


        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: true,
            bevelSegments: 6,
            steps: 20,
            bevelSize: 0.05,
            bevelThickness: 0.02
        };

        // Crear la geometría extruida
        var rounded_box = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var box_1 = new THREE.BoxGeometry(2, 0.3, 0.15);
        box_1.translate(0, 0.12, 0.1);
        box_1.rotateZ(0.01);


        var rounded_box_mesh = new THREE.Mesh(rounded_box, material);
        var box_1_mesh = new THREE.Mesh(box_1, material);

        var cylinder = new THREE.CylinderGeometry(0.05, 0.0001, 0.8, 20, 20);
        cylinder.translate(0.025, 0.1,0.1);
        cylinder.scale(2,0.5,1)

        var cylinder_mesh = new THREE.Mesh(cylinder, material);

   


  



        var csg = new CSG();
        csg.union([rounded_box_mesh]);
        csg.subtract([box_1_mesh, cylinder_mesh]);


        var resultadoMesh = csg.toMesh();

        //this.add(box_1_mesh)
        this.add(resultadoMesh);
        
    }
}

export { Pieza };