import * as THREE from 'three';
import { BeeAla, BeeBody } from './Bee.js';
import { Vector3 } from '../libs/three.module.js';

class BeeEnemy extends THREE.Object3D {
    constructor() {
        super();  // Llama al constructor de la superclase

        const scale = new Vector3(0.02, 0.02, 0.02);
        const offsetY = 0;
        const rotation = Math.PI*1.5;

        // Nodo contenedor
        this.beeNode = new THREE.Object3D();

        // Crea el cuerpo de la abeja
        const body = new BeeBody();
        body.scale.copy(scale);
        //body.position.y += offsetY;
        body.rotateY(rotation);
        this.beeNode.add(body);

        // Crea el ala 1
        this.ala1 = new BeeAla();
        this.ala1.scale.copy(scale);
        //this.ala1.position.y += offsetY;
        this.ala1.rotateY(rotation);
        this.beeNode.add(this.ala1);

        // Crea el ala 2
        this.ala2 = new BeeAla();
        this.ala2.scale.copy(scale);
        this.ala2.rotateY(Math.PI);
        //this.ala2.position.y += offsetY;
        this.ala2.rotateY(rotation);
        this.beeNode.add(this.ala2);

        // Añade el nodo contenedor al objeto 3D (esto mismo, 'this')
        this.beeNode.position.y += offsetY;
        this.add(this.beeNode);

        this.time = 0;
        this.target = { position: new THREE.Vector3(0, 0, 0) }; // Inicializa el objetivo como un objeto con una propiedad position
    }

    update() {
        // Movimiento oscilatorio en el eje Y
        this.position.y += Math.sin(this.time) * 0.006;

        // Rotación de las alas
        this.ala1.rotateZ(-Math.sin(this.time) * 0.1);
        this.ala2.rotateZ(Math.sin(this.time) * 0.1);

        this.time += 0.1;

        if (this.target && this.target.position) {
            this.beeNode.lookAt(this.target.position);
        }
    }

    setTarget(target){
        this.target = target;

    }



}

export { BeeEnemy };
