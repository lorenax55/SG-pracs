// Importamos las bibliotecas necesarias y definimos la clase base
import * as THREE from '../libs/three.module.js';
import { GUI } from '../libs/dat.gui.module.js';

class AnimatedGeometry extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Creamos la GUI para esta geometría
        this.createGUI(gui, titleGui);

        // Inicializamos la geometría según la implementación en las clases hijas
        this.createGeometry();

        // Configuramos la velocidad de rotación
        this.rotationSpeed = 0.01;
    }

    // Método abstracto para crear la geometría específica en las clases hijas
    createGeometry() {
        throw new Error('El método createGeometry debe ser implementado en las clases hijas.');
    }

    // Método para crear la GUI común a todas las geometrías animadas
    createGUI(gui, titleGui) {
        this.guiControls = {
            // Propiedades de la geometría y su posición
            sizeX: 1.0,
            sizeY: 1.0,
            sizeZ: 1.0,

            // Método para resetear los controles
            reset: () => {
                this.guiControls.sizeX = 1.0;
                this.guiControls.sizeY = 1.0;
                this.guiControls.sizeZ = 1.0;
                this.update();
            },
        };

        // Creamos una carpeta en la GUI para esta geometría
        var folder = gui.addFolder(titleGui);

        // Agregamos controles para la escala y posición
        folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name('Tamaño X: ').listen();
        folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name('Tamaño Y: ').listen();
        folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name('Tamaño Z: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    // Método para actualizar la geometría con los valores de los controles
    update() {
        this.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);

        // Método para rotar la geometría, puede ser sobreescrito por las clases hijas
        this.rotateGeometry();
    }

    // Método para rotar la geometría, puede ser sobreescrito por las clases hijas
    rotateGeometry() {
        this.rotateY(this.rotationSpeed);
    }
}

// Exportamos la clase base AnimatedGeometry
export { AnimatedGeometry };
