import * as THREE from 'three';
import { BeeAla, BeeBody } from './Bee.js'
import { Vector3 } from '../libs/three.module.js';

class BeeEnemy extends THREE.Object3D {
    constructor() {
        super();  // Llama al constructor de la superclase

        // Crea una geometría de plano. Los argumentos son ancho y alto.
        //const geometry = new THREE.BoxGeometry(0.05,0.05,0.1);

        // Crea un material básico de color negro
        //const material = new THREE.MeshBasicMaterial({ color: 0x000000 });  // Negro

        // Crea un mesh combinando la geometría y el material
        const scale = new Vector3(0.02,0.02,0.02)
        const offsetY = 0.2;
        const rotation = 90;

        const body = new BeeBody();
        body.scale.copy(scale);
        body.position.y += offsetY;

        // Añade el mesh al objeto 3D (esto mismo, 'this')
        this.add(body);

        this.ala1 = new BeeAla();
        this.ala1.scale.copy(scale);
        this.ala1.position.y += offsetY;

        

        // Añade el mesh al objeto 3D (esto mismo, 'this')
        this.add(this.ala1);

        this.ala2 = new BeeAla();
        this.ala2.scale.copy(scale);
        this.ala2.rotateY(Math.PI)
        // Añade el mesh al objeto 3D (esto mismo, 'this')
        this.add(this.ala2);
        this.rotateY(-Math.PI*0.5);
        this.ala2.position.y += offsetY;

        
        this.time = 0;
    }

    update() {
        //funcion que sube y baja el objeto continuamente
        //this.position.y += Math.sin(this.time)*0.01;
        this.ala1.rotateZ(-Math.sin(this.time)*0.1);
        this.ala2.rotateZ(Math.sin(this.time)*0.1);


        this.time += 0.1;

        
    }

}

export { BeeEnemy };
