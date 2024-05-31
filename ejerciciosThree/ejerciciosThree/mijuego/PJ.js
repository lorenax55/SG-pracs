import * as THREE from 'three';
import { Beetle } from './Beetle.js'

class PJ extends THREE.Object3D {
    constructor(curve) {
        super();  // Llama al constructor de la superclase

        // Crea una geometría de plano. Los argumentos son ancho y alto.
        //const geometry = new THREE.BoxGeometry(0.05,0.05,0.1);

        // Crea un material básico de color negro
        //const material = new THREE.MeshBasicMaterial({ color: 0x000000 });  // Negro

        // Crea un mesh combinando la geometría y el material
        this.mesh = new Beetle();
        
        this.mesh.position.set(0,0.2,0);
        this.mesh.scale.set(0.02,0.02,0.02);
        this.mesh.rotation.y=-Math.PI*0.5;

        // Añade el mesh al objeto 3D (esto mismo, 'this')
        this.add( this.mesh);

        //variables del pj
        this.health = 3;
        this.puntos = 0; 
        
        this.pointLight = new THREE.PointLight( 0x3debbf );
        this.pointLight.position.set( 0, 0.3, 0 );
        this.pointLight.power = 0;
        this.add(this.pointLight);

        this.mycamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
        this.mycamera.position.set (0, 1.5, -1);
        
        let look = new THREE.Vector3(0,0,0);
        this.mesh.getWorldPosition(look);
        this.mycamera.lookAt(look);
        this.add(this.mycamera);
        
    }


    get_damage() {
        this.health -= 1;
        console.log(this.health);

        // Guardar el material original
        const originalMaterial = this.mesh.get_material();

        // Crear un material rojo
        const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // Cambiar el material del mesh a rojo
        this.mesh.material = redMaterial;

        // Esperar 0.3 segundos y restaurar el material original
        setTimeout(() => {
            this.mesh.material = originalMaterial;
        }, 300);
    }

    heal(){
        this.health += 1;
        if(this.health >= 3)
            this.health = 3;
    }

    add_points(points){
        this.puntos += points;
    }

    turn_light_on() {
        this.pointLight.power = 200; // Enciende la luz
    
        // Espera 0.5 segundos (500 milisegundos) y apaga la luz
        setTimeout(() => {
            this.pointLight.power = 0;
        }, 500);
    }

    get_camera(){
        return this.mycamera;
    }



}

export { PJ };
