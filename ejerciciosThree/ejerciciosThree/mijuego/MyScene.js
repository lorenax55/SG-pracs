
// Clases de la biblioteca
//import * as THREE from "three"

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto

import { Tubo } from './Tubo.js'
import { PJ } from './PJ.js'
import { Hoja } from './Hoja.js'



 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    // Todas las unidades están en metros
    this.axis = new THREE.AxesHelper (0.1);
    this.add (this.axis);
    
    //camino:
    const puntos = [ 
      new THREE.Vector3(-2.0, 0, 2.0),   
      new THREE.Vector3(-4.2, 1.0, 4.2), 
      new THREE.Vector3(-3.0, 0, -3.0),  
      new THREE.Vector3(0, 0, -4.2),     
      new THREE.Vector3(3.0, -1.0, -3.0),
      new THREE.Vector3(4.2, 1.0, 0),    
      new THREE.Vector3(3.0, 0, 4.2),    
      new THREE.Vector3(1.2, -1.0, 3.0), 
      new THREE.Vector3(2.0, 0, 2.0)    
  ]; 
  

    this.curve = new THREE.CatmullRomCurve3(puntos, true); // true para que la curva sea cerrada
    const material_verde = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const material_verde2 = new THREE.MeshPhongMaterial({ color: 0xffffff });


    this.model = new Tubo(this.curve, material_verde);
    this.add (this.model);

    this.PJ = new PJ();
    this.add(this.PJ);

    // Crear un nuevo tubo con la nueva curva
    const newTube1 = new Tubo(this.curve, material_verde2);
    const newTube2 = new Tubo(this.curve, material_verde2);
    const newTube3 = new Tubo(this.curve, material_verde2);


    // Posicionar los tubos de manera que estén separados en el eje X
    newTube1.position.x = 8;
    newTube2.position.y = 8;
    newTube3.position.z = 8;

    // Añadir el nuevo tubo a la escena o al objeto padre
    this.add(newTube1);
    this.add(newTube2);
    this.add(newTube3);


    //controles
    this.angle = 0;

    for (let i = 0; i < 15; i++) {
      // Crear una nueva instancia de Hoja
      const hoja = new Hoja(material_verde);
  
      // Generar un valor aleatorio para 't' entre 0 y 1
      const t = Math.random();
  
      // Posicionar la hoja en un punto aleatorio de la curva
      hoja.position.copy(this.curve.getPointAt(t));
  
      // Escalar la hoja
      hoja.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));
  
      // Rotar la hoja en cada eje con valores aleatorios entre 0 y 2π (360 grados)
      hoja.rotation.x = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje x
      hoja.rotation.y = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje y
      hoja.rotation.z = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje z
  
      // Añadir la hoja a la escena o a un objeto parent específico
      this.add(hoja);
  }

    
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
    // También se indica dónde se coloca
    this.camera.position.set (0.2, 0.05, 0.2);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    /*
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    */
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 100.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 0.35,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 200, 10)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLight = new THREE.SpotLight( 0xffffff );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 2, 3, 1 );
    this.add (this.pointLight);
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  updateCameraPosition(t) {
    // Obtener la posición actual de PJ en la curva
    let pjPosition = this.PJ.position.clone();
    
    // Obtener la tangente en la posición de PJ para determinar la dirección de movimiento
    let tangent = this.curve.getTangentAt(t % 1).normalize();

    let normal = new THREE.Vector3(0, 1, 0);  // Start with the global up vector
    normal.applyQuaternion(this.PJ.quaternion); // Apply the object's rotation
    
    pjPosition.add(normal.clone().multiplyScalar(0.15));


    // Calcular la dirección hacia atrás multiplicando la tangente por un escalar negativo
    let backward = tangent.clone().multiplyScalar(-0.9); // Escala ajustable para distancia detrás de PJ


    
    // Configurar el offset de altura y lateral dependiente del ángulo
    const verticalOffset = 0;  // Elevación fija, ajustable según necesidad
    const lateralOffset = 0.5;   // Desplazamiento lateral para mantener la cámara alineada con el ángulo de PJ

    // Combinar offsets para obtener la posición final de la cámara
    const cameraPosition = pjPosition.clone()
                                      .add(backward)                 // Atrás de PJ
                                      .add(normal.multiplyScalar(lateralOffset))  // Offset lateral dependiente del ángulo
                                      .add(new THREE.Vector3(0, verticalOffset, 0));  // Offset vertical

    // Actualizar la posición de la cámara
    this.camera.position.copy(cameraPosition);
    
    // La cámara debe mirar directamente a la posición actual de PJ
    this.camera.lookAt(pjPosition);
}


  updatePJ(t) {
    // Obtener la posición en la curva
    const position = this.curve.getPointAt(t % 1);

    // Ajustar la posición para mantenerla a una altura constante sobre la curva
    //position.y += 0.15; // Aumenta la coordenada y por 0.1 unidades

    // Obtener la tangente en la misma posición de la curva
    const tangent = this.curve.getTangentAt(t % 1);

    // Ajustar la posición del objeto PJ
    this.PJ.position.copy(position);

    // Crear una dirección de mira usando el vector tangente
    const lookAtPosition = position.clone().add(tangent);

    this.PJ.lookAt(lookAtPosition); // haz esto sin tocar la x

    // Configurar la orientación de PJ para que mire hacia la dirección de la curva
    //console.log(axis);
    const axis = new THREE.Vector3(0, 0, 1);
    const angle = THREE.MathUtils.degToRad(30);

    this.PJ.quaternion.multiplyQuaternions(this.PJ.quaternion, new THREE.Quaternion().setFromAxisAngle(axis, this.angle));

  }

  handleKeyDown(event, scene) {
    switch(event.key) {
        case 'ArrowRight':
            // Aumentar el ángulo
            scene.angle += 0.1;
            //console.log(scene.angle);
            break;
        case 'ArrowLeft':
            // Disminuir el ángulo
            scene.angle -= 0.1;
            //console.log(scene.angle);
            break;
    }
    //print(scene.angle);
  }

  update () {
    const time = Date.now() * 0.00001; // Controla la velocidad de la animación

    this.updatePJ(time);
    this.updateCameraPosition(time);

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener("keydown", (event) => scene.handleKeyDown(event, scene));

  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});