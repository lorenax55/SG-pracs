import * as THREE from 'three';
import { Beetle } from './Beetle.js';

class PJ extends THREE.Object3D {
    constructor(curve) {
        super(); // Llama al constructor de la superclase

        this.mesh = new Beetle();
        this.mesh.position.set(0, 0.2, 0);
        this.mesh.scale.set(0.01, 0.01, 0.01);
        this.mesh.rotation.y = -Math.PI * 0.5;
        this.add(this.mesh);

        this.health = 3;
        this.puntos = 0;

        this.pointLight = new THREE.PointLight(0x3debbf);
        this.pointLight.position.set(0, 0.3, 0);
        this.pointLight.power = 0;
        this.add(this.pointLight);

        this.mycamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
        this.mycamera.position.set(0, 1.5, -1);

        let look = this.position;
        this.mesh.getWorldPosition(look);
        this.mycamera.lookAt(look);
        this.add(this.mycamera);

        this.updateUI();
        
        this.attack = false;
    }

    updateUI() {
        // Actualizar corazones
        const heartsContainer = document.getElementById('hearts');
        heartsContainer.innerHTML = '';
        for (let i = 0; i < this.health; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heartsContainer.appendChild(heart);
        }

        // Actualizar puntos
        const pointsContainer = document.getElementById('points');
        pointsContainer.textContent = `Puntos: ${this.puntos}`;
    }

    showGameOver() {
        const gameOverContainer = document.getElementById('gameOverContainer');
        const finalPoints = document.getElementById('finalPoints');
        finalPoints.textContent = `Puntos: ${this.puntos}`;
        gameOverContainer.style.display = 'block';
    }

    hideGameOver() {
        const gameOverContainer = document.getElementById('gameOverContainer');
        gameOverContainer.style.display = 'none';
    }

    get_damage() {
        // Decrement health
        this.health -= 1;
        
        // Update UI
        this.updateUI();
    
        // Flash character in red (change material color temporarily)
        const originalMaterial = this.mesh.get_material(); // Assuming you have a method to get the material
        const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh.change_material(redMaterial); // Assuming you have a method to change the material
        
        // Revert back to original material after a short delay
        setTimeout(() => {
            this.mesh.change_material(originalMaterial); // Assuming you have a method to change the material
        }, 300); // Adjust the delay time as needed
        
        // Check if health is zero or below
        if (this.health <= 0) {
            this.showGameOver();
            return true; // Indicate that the player is dead
        }
        
        return false; // Indicate that the player is still alive
    }
    

    heal() {
        this.health += 1;
        if (this.health >= 3)
            this.health = 3;
        this.updateUI();
    }

    add_points(points) {
        this.puntos += points;
        this.updateUI();
    }

    turn_light_on() {
        this.pointLight.power = 200; // Enciende la luz

        // Espera 0.5 segundos (500 milisegundos) y apaga la luz
        setTimeout(() => {
            this.pointLight.power = 0;
        }, 500);
    }

    turn_light2_on() {
        this.pointLight.power = 200; // Enciende la luz
        this.pointLight.color.set(0x6EFF00);


        const originalMaterial = this.mesh.get_material(); // Assuming you have a method to get the material
        const redMaterial = new THREE.MeshPhongMaterial({ color: 0xDA00FF });
        this.mesh.change_material(redMaterial); // Assuming you have a method to change the material

        // Espera 0.5 segundos (500 milisegundos) y apaga la luz
        setTimeout(() => {
            this.pointLight.power = 0;
            this.mesh.change_material(originalMaterial); // Assuming you have a method to change the material
        }, 2000);
    }

    turn_light3_on() {
        this.pointLight.power = 200; // Enciende la luz
        this.pointLight.color.set(0xFF007F);

        const originalMaterial = this.mesh.get_material(); // Assuming you have a method to get the material
        const redMaterial = new THREE.MeshPhongMaterial({ color: 0xDA00FF });
        this.mesh.change_material(redMaterial); // Assuming you have a method to change the material

        // Espera 0.5 segundos (500 milisegundos) y apaga la luz
        setTimeout(() => {
            this.pointLight.power = 0;
            this.mesh.change_material(originalMaterial); // Assuming you have a method to change the material
        }, 2000);
    }

    get_camera() {
        return this.mycamera;
    }

    attack_mode(mode){
        console.log("ataque diooo");
        this.attack = true;
        setTimeout(() => {
            this.attack = false;
        }, 4000);
    }

    get_attack(){
        return this.attack;
    }

    die() {
        this.health = 3;
        this.puntos = 0;
        this.updateUI();
        
        // Espera 2 segundos antes de esconder el "Game Over"
        setTimeout(() => {
            this.hideGameOver();
        }, 2000);
    }
}

export { PJ };
