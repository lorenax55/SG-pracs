// MyGeometries.js

// Importamos las clases necesarias de Three.js
import * as THREE from '../libs/three.module.js';
import { GUI } from '../libs/dat.gui.module.js';

import { AnimatedGeometry } from './AnimatedGeometry.js'

class ExtHeart extends AnimatedGeometry {
    constructor(gui, titleGui) {
        super(gui, titleGui);
    }

    createGeometry() {
		const heartShape = new THREE.Shape();

		heartShape.moveTo(0.25, 0.25);
		heartShape.bezierCurveTo(0.25, 0.25, 0.20, 0.0, 0.0, 0.0);
		heartShape.bezierCurveTo(-0.3, 0.0, -0.3, 0.35, -0.3, 0.35);
		heartShape.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95);
		heartShape.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
		heartShape.bezierCurveTo(0.8, 0.35, 0.8, 0.0, 0.5, 0.0);
		heartShape.bezierCurveTo(0.35, 0.0, 0.25, 0.25, 0.25, 0.25);



		const extrudeSettings = {
			depth: 0.05,
			bevelEnabled: true,
			bevelSegments: 3,
			steps: 3,
			bevelSize: 0.15,
			bevelThickness: 0.1
		};

		// Crear la geometría extruida
		var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

		// Crear el material
		const material = new THREE.MeshStandardMaterial({
			color: 0xFF0000, // Color rojo
			roughness: 0.2, // Baja rugosidad para una superficie más brillante
			metalness: 0.6, // Alta metalicidad para un aspecto más brillante y metálico
			side: THREE.DoubleSide // Make the material two-sided
		});

		// Crear el mesh
		this.extGeom = new THREE.Mesh(geometry, material);
		this.add(this.extGeom);
	}

}

class ExtTube extends AnimatedGeometry {
	constructor(gui, titleGui) {
		super(gui, titleGui);
	}

	createGeometry() {
		// Define una curva que represente la trayectoria
		
		var path = new THREE.CatmullRomCurve3([
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0, 0.50, 0),
			new THREE.Vector3(0.50, 0.50, 0),
			new THREE.Vector3(0.50, 0, 0),
			new THREE.Vector3(0.8, 1, 1),
			new THREE.Vector3(-0.8, 1, -1)
		], true);
		

		// Define la forma que deseas extruir
		var radius = 0.1; // Radio del tubo
		var segments = 100; // Número de segmentos a lo largo del tubo
		var closed = false; // Indica si el tubo está cerrado alrededor del camino

		// Crea la geometría del tubo siguiendo la trayectoria
		var tubeGeometry = new THREE.TubeGeometry(path, segments, radius, 8, closed);

		// Crea un material y un objeto mesh para visualizar la geometría
		const material = new THREE.MeshStandardMaterial({
			color: 0x00FF00, // Color rojo
			roughness: 0.2, // Baja rugosidad para una superficie más brillante
			metalness: 0.6, // Alta metalicidad para un aspecto más brillante y metálico
			side: THREE.DoubleSide // Make the material two-sided

		});
		
		var mesh = new THREE.Mesh(tubeGeometry, material);

		// Añade el objeto mesh a la escena
		this.add(mesh);
	}

}

class ExtNoBisel extends AnimatedGeometry {
	constructor(gui, titleGui) {
		super(gui, titleGui);
	}

	createGeometry() {
		// Define la forma que deseas extruir
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, 0.10);
		shape.lineTo(0.10, 0.10);
		shape.lineTo(0.10, 0);
		shape.lineTo(0.0, 0);

		// Define los parámetros de la extrusión
		var extrudeSettings = {
			steps: 1, // Número de divisiones a lo largo de la extrusión
			depth: 1, // Profundidad de la extrusión
			bevelEnabled: false, // Desactivar el bisel
		};

		// Crea la geometría extruida sin bisel
		var extrudedGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

		// Crea un material y un objeto mesh para visualizar la geometría
		const material = new THREE.MeshStandardMaterial({
			color: 0x120FF0, // Color rojo
			roughness: 0.2, // Baja rugosidad para una superficie más brillante
			metalness: 0.6, // Alta metalicidad para un aspecto más brillante y metálico
		});
		var mesh = new THREE.Mesh(extrudedGeometry, material);

		// Añade el objeto mesh a la escena
		this.add(mesh);

	}

}
export { ExtHeart, ExtTube, ExtNoBisel };
