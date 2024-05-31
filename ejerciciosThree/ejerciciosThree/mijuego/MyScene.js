
// Clases de la biblioteca
//import * as THREE from "three"

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto

import { Tubo } from './Tubo.js'
import { PJ } from './PJ.js'
import { Hoja } from './Hoja.js'
import { Spike } from './Spike.js'
import { Runa1 } from './Runa1.js'
import { Runa2 } from './Runa2.js'
import { Scroll } from './Scroll.js'
import { BeeEnemy } from './BeeEnemy.js'



 
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
    const material_verde2 = new THREE.MeshPhongMaterial({ color: 0x32a852 });
    const material_pincho = new THREE.MeshPhongMaterial({ color: 0xf00f00 });
    const material_purple = new THREE.MeshPhongMaterial({ color: 0xa020f0 });



    this.model = new Tubo(this.curve, material_verde);
    this.add (this.model);

    this.PJ = new PJ();
    this.add(this.PJ);
    this.velocity = 0.8;
    this.distance = 0;

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    this.createSecondCamera();
    this.createPJcamera();
    this.cameras = [this.camera, this.secondCamera, this.camerapj, this.PJ.get_camera()];
    this.activeCameraIndex = 0;
    this.activeCamera = this.cameras[this.activeCameraIndex];


    const metaGeo = new THREE.BoxGeometry(0.2,3,3);
    this.meta = new THREE.Mesh(metaGeo, material_verde2);
    const time = Date.now() * 0.00001 +0.02;
    this.meta.position.copy(this.curve.getPointAt(time % 1));
    this.add( this.meta);
    this.meta.visible = false;

    // Crear un nuevo tubo con la nueva curva
    const newTube1 = new Tubo(this.curve, material_verde2);
    const newTube2 = new Tubo(this.curve, material_verde2);
    const newTube3 = new Tubo(this.curve, material_verde2);


    // Posicionar los tubos de manera que estén separados en el eje X
    newTube1.position.x = 6;
    newTube2.position.y = 1.5;
    newTube2.position.x = -3;
    newTube2.position.z = -2;

    newTube3.position.z = -3;
    newTube3.position.y = -2;

    // Añadir el nuevo tubo a la escena o al objeto padre
    this.add(newTube1);
    this.add(newTube2);
    this.add(newTube3);


    //controles
    this.angle = 0;

    //COLISIONES
    this.collisionCooldown = 1000; // cooldown time in milliseconds
    this.lastCollisions = new Map(); // to store the last collision time    

    this.hojas = []
    for (let i = 0; i < 15; i++) {
      // Crear una nueva instancia de Hoja
      const hoja = new Hoja(material_verde2);
  
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

      this.hojas.push(hoja);

  }

  this.spikes = []
  for (let i = 0; i < 15; i++) {
    const spike = new Spike(material_pincho);

    const t = Math.random();

    spike.position.copy(this.curve.getPointAt(t));

    spike.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));

    spike.rotation.x = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje x
    spike.rotation.y = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje y
    spike.rotation.z = Math.random() * Math.PI * 2; // Rotación aleatoria alrededor del eje z

    this.add(spike);
    this.spikes.push(spike);

  }



  this.abejas = [];

  for (let i = 0; i < 15; i++) {
      const abeja = new BeeEnemy();

      const t = Math.random();
      const position = this.curve.getPointAt(t);
      abeja.position.copy(position);

      // Obtener la tangente de la curva en el punto `t`
      const tangent = this.curve.getTangentAt(t).normalize();

      // Generar una dirección aleatoria normal a la tangente
      const normal = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
      ).normalize();
      normal.cross(tangent).normalize();

      // Desplazar la posición de la abeja 0.3 unidades en la dirección normal
      const displacement = normal.multiplyScalar(0.2);
      abeja.position.add(displacement);

      // Establecer el objetivo de la abeja
      abeja.setTarget(this.PJ);

      // Añadir la abeja a la escena y al array de abejas
      this.add(abeja);
      this.abejas.push(abeja);
  }

  //picking:
  this.mouse = new THREE.Vector2();
  this.raycaster = new THREE.Raycaster();

  this.createGround();
  this.createSkybox();

  this.createRuna1(material_purple);
  this.createRuna2();
  this.createScroll();


    
  }

  createRuna1(material) {
    this.runas1 = [];
    for (let i = 0; i < 15; i++) {
        const runa = new Runa1(material);

        const t = Math.random();

        runa.position.copy(this.curve.getPointAt(t));
        runa.position.x += (Math.random() - 0.5) * 2;
        runa.position.y += (Math.random() - 0.5) * 2;

        // Mueve la runa en la dirección de un vector normal a la curva
        const tangent = this.curve.getTangentAt(t).normalize();
        const normal1 = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().cross(tangent).normalize();
        runa.position.add(normal1.multiplyScalar(Math.random() * 0.5 + 0.5));

        // Mueve la runa en otra dirección normal a la curva y al vector anterior
        const normal2 = new THREE.Vector3().crossVectors(tangent, normal1).normalize();
        runa.position.add(normal2.multiplyScalar(Math.random() * 0.5 + 0.5));

        runa.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));
        this.add(runa);
        this.runas1.push(runa);
    }
}

createRuna2() {
  this.runas2 = [];
  for (let i = 0; i < 15; i++) {
      const runa = new Runa2();

      const t = Math.random();

      runa.position.copy(this.curve.getPointAt(t));
      runa.position.x += (Math.random() - 0.5) * 2;
      runa.position.y += (Math.random() - 0.5) * 2;

      // Mueve la runa en la dirección de un vector normal a la curva
      const tangent = this.curve.getTangentAt(t).normalize();
      const normal1 = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
      ).normalize().cross(tangent).normalize();
      runa.position.add(normal1.multiplyScalar(Math.random() * 0.5 + 0.5));

      // Mueve la runa en otra dirección normal a la curva y al vector anterior
      const normal2 = new THREE.Vector3().crossVectors(tangent, normal1).normalize();
      runa.position.add(normal2.multiplyScalar(Math.random() * 0.5 + 0.5));

      runa.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));
      this.add(runa);
      this.runas2.push(runa);
  }
}

createScroll() {
  this.scrolls = [];
  for (let i = 0; i < 15; i++) {
      const scroll = new Scroll();

      const t = Math.random();

      scroll.position.copy(this.curve.getPointAt(t));
      scroll.position.x += (Math.random() - 0.5) * 2;
      scroll.position.y += (Math.random() - 0.5) * 2;

      // Mueve el scroll en la dirección de un vector normal a la curva
      const tangent = this.curve.getTangentAt(t).normalize();
      const normal1 = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
      ).normalize().cross(tangent).normalize();
      scroll.position.add(normal1.multiplyScalar(Math.random() * 0.5 + 0.5));

      // Mueve el scroll en otra dirección normal a la curva y al vector anterior
      const normal2 = new THREE.Vector3().crossVectors(tangent, normal1).normalize();
      scroll.position.add(normal2.multiplyScalar(Math.random() * 0.5 + 0.5));

      scroll.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));
      this.add(scroll);
      this.scrolls.push(scroll);
  }
}



  // Añadir esto en el constructor de la clase MyScene

  createGround() {
    // Crear la geometría de un plano grande
    const groundGeometry = new THREE.PlaneGeometry(200, 200);

    // Crear un material para el suelo, puedes cambiar el color a tu preferencia
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xA3D76D }); 

    // Crear la malla del suelo
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);

    // Rotar el plano para que esté horizontal
    ground.rotation.x = - Math.PI / 2;
    ground.position.y -= 3;

    // Añadir sombras
    ground.receiveShadow = true;

    // Añadir el suelo a la escena
    this.add(ground);

    // Crear la geometría y material para los conos y cajas
    const coneGeometry = new THREE.ConeGeometry(1, 4, 8);
    const boxGeometry = new THREE.BoxGeometry(1, 4, 1);
    const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x64CB4B });

    // Añadir conos y cajas en puntos aleatorios
    const numObjects = 300; // Número total de conos y cajas

    for (let i = 0; i < numObjects; i++) {
        // Crear un cono o una caja al azar
        const isCone = Math.random() > 0.5;
        const mesh = isCone ? new THREE.Mesh(coneGeometry, greenMaterial) : new THREE.Mesh(boxGeometry, greenMaterial);

        // Generar una posición aleatoria sobre el plano
        const x = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 30;
        const y = -3; // Asegurarse de que estén sobre el plano

        // Establecer la posición de la malla
        mesh.position.set(x, y, z);
        mesh.scale.copy(new THREE.Vector3(0.2,0.2,0.2));

        // Añadir sombras
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Añadir la malla a la escena
        this.add(mesh);
    }
}


  createSkybox() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      '../imgs/sky.png', '../imgs/sky.png',
      '../imgs/sky.png', '../imgs/sky.png',
      '../imgs/sky.png', '../imgs/sky.png'
    ]);
    this.background = texture;
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

  createPJcamera(){

    this.camerapj = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camerapj.position.set (0, 1.5, -1);
    var look = new THREE.Vector3 (0,0,0);
    this.camerapj.lookAt(look);
    this.PJ.add(this.camerapj);
    
    this.cameraControl = new TrackballControls (this.camerapj, this.renderer.domElement);
    this.cameraControl.target = look;
  }

  createSecondCamera() {
    this.secondCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
    this.secondCamera.position.set(0, 10, 0);
    var look = new THREE.Vector3(0, 0, 0);
    this.secondCamera.lookAt(look);
    this.add(this.secondCamera);
  }



  updateCameraControls() {
    console.log("actualizando controles");
    // Eliminamos el control actual
    if (this.cameraControl) {
        this.cameraControl.dispose();
    }
    
    // Creamos nuevos controles para la cámara activa
    this.cameraControl = new TrackballControls(this.activeCamera, this.renderer.domElement);
    
    // Configuramos las velocidades de los movimientos
    /*
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    */
    
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target.set(0, 0, 0);
    
    // Actualizamos los controles
    this.cameraControl.update();
}

  switchCamera() {
    this.activeCameraIndex = (this.activeCameraIndex + 1) % this.cameras.length;
    console.log(this.activeCameraIndex);
    this.activeCamera = this.cameras[this.activeCameraIndex];
    this.updateCameraControls();
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

    this.pointLight2 = new THREE.SpotLight( 0xebce67 );
    this.pointLight2.position.set( -1, 0, 0 );
    this.pointLight2.power = 50;
    this.add (this.pointLight2);


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
    return this.activeCamera;
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
    //    *** HACER QUE LA CAMARA GUIRE CON EL PJ PARA QUE SIEMRE ESTÉ RECTO ***
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

  updateCameraPjPosition(t){
    this.camerapj.lookAt(this.PJ.position.clone());

  }


  updatePJ(t) {
    // Obtener la posición en la curva
    const position = this.curve.getPointAt(t % 1);
    //console.log(t%1)

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

  die() {
    this.velocity = 0; // Resetear la velocidad inicial
    this.PJ.die(); // Llamar a la función die del personaje
    
    // Esperar 2 segundos antes de detener y reiniciar el juego
    setTimeout(() => {
      this.velocity = 0.8; // Restaurar la velocidad inicial
    }, 2000);
  }

  handleRuna1Click(selectedObject, rootObject, point) {
    console.log("RUNA1");

    this.PJ.turn_light_on();
    this.PJ.heal();
    selectedObject.parent.countdown(); //dame el nodo mas superior, no la malla
  }

  handleRuna2Click(selectedObject, rootObject, point) {
    console.log("RUNA2: ", rootObject.parent);
    this.PJ.turn_light2_on();
    this.PJ.add_points(100);
    rootObject.parent.countdown(); //dame el nodo mas superior, no la malla
  }

  handleScrollClick(selectedObject, rootObject, point) {
    console.log("SCROLL: ",  rootObject.parent);
    this.PJ.turn_light3_on();
    this.PJ.attack_mode();
    rootObject.parent.countdown(); //dame el nodo mas superior, no la malla
  }

  handleAbejaClick(selectedObject, rootObject, point) {
    console.log('ABEJA: ',  rootObject.parent.parent.parent);

    rootObject.parent.parent.parent.countdown(); //dame el nodo mas superior, no la malla
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
        case 'ArrowUp':
          // Disminuir el ángulo
          scene.velocity += 0.1;
          //console.log("velocidad: "+scene.velocity);
          break;
        case 'ArrowDown':
            // Disminuir el ángulo
            scene.switchCamera();
            console.log("space");
            break;
    }
    //print(scene.angle);
  }

  onDocumentMouseDown(event, scene) {
    // Obtener la posición del mouse en coordenadas de dispositivo normalizadas (-1 a +1) para ambos componentes.
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualizar el raycaster con la cámara y la posición del mouse.
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calcular los objetos que intersectan el rayo.
    const intersects = this.raycaster.intersectObjects([...this.runas1, ...this.runas2, ...this.scrolls, ...this.abejas], true);

    if (intersects.length > 0) {
        // Obtener el primer objeto intersectado.
        const selectedObject = intersects[0].object;

        // Obtener el Object3D raíz a partir de userData si es necesario.
        const rootObject = selectedObject.parent;

        // Loguear o manejar el objeto seleccionado.
        console.log('Objeto seleccionado:', selectedObject);
        console.log('Object3D raíz:', rootObject);

        // Manejar lo que sucede cuando se hace clic en un objeto Runa1, Runa2 o Scroll.
        if (this.runas1.includes(selectedObject.parent)) {
            // Manejar clic en Runa1ç+
            console.log("runa1handle");
            this.handleRuna1Click(selectedObject, rootObject, intersects[0].point);
        } else if (this.runas2.includes(rootObject.parent)) {
            // Manejar clic en Runa2
            console.log("runa2handle");
            this.handleRuna2Click(selectedObject, rootObject, intersects[0].point);
        } else if (this.scrolls.includes(rootObject.parent)) {
            // Manejar clic en Scroll
            console.log("scrollHandle");
            this.handleScrollClick(selectedObject, rootObject, intersects[0].point);
        }
        else if (this.abejas.includes(rootObject.parent.parent.parent) && this.PJ.get_attack()) {
          // Manejar clic en Scroll
          console.log("abejaHandle");
          this.handleAbejaClick(selectedObject, rootObject, intersects[0].point);
      }
        else{
          console.log("ninguno");
        }
    }
}


  check_collisions() {
    const cajaPJ = new THREE.Box3();
    cajaPJ.setFromObject(this.PJ);

    const currentTime = Date.now();
    //choques pinchos
    for (let i = 0; i < this.spikes.length; i++) {
      const cajaSpike = new THREE.Box3();
      cajaSpike.setFromObject(this.spikes[i]);

      const spikeId = `spike-${i}`;
      const lastCollisionTime = this.lastCollisions.get(spikeId) || 0;

      if (cajaPJ.intersectsBox(cajaSpike) && (currentTime - lastCollisionTime > this.collisionCooldown)) {
        this.lastCollisions.set(spikeId, currentTime);
        // Handle damage
        if(this.PJ.get_damage()){
          this.die();
        }

        this.velocity -= 0.15;
        if(this.velocity <= 0)
          this.velocity = 0;
        this.spikes[i].countdown();
      }
    }

    //choques hojas
    for (let i = 0; i < this.hojas.length; i++) {
      const cajaLeave = new THREE.Box3();
      cajaLeave.setFromObject(this.hojas[i]);

      const leaveId = `leave-${i}`;
      const lastCollisionTime = this.lastCollisions.get(leaveId) || 0;

      if (cajaPJ.intersectsBox(cajaLeave) && (currentTime - lastCollisionTime > this.collisionCooldown)) {
        this.lastCollisions.set(leaveId, currentTime);
        // Handle gaining life
        this.velocity += 0.2;
        this.PJ.add_points(10);
        this.hojas[i].countdown();
      }
    }

      // Colisiones con las abejas
      for (let i = 0; i < this.abejas.length; i++) {
        const cajaAbeja = new THREE.Box3();
        cajaAbeja.setFromObject(this.abejas[i]);

        const abejaId = `abeja-${i}`;
        const lastCollisionTime = this.lastCollisions.get(abejaId) || 0;

        if (cajaPJ.intersectsBox(cajaAbeja) && (currentTime - lastCollisionTime > this.collisionCooldown)) {
            this.lastCollisions.set(abejaId, currentTime);
            // Manejar daño al personaje principal
            if (this.PJ.get_damage()) {
                this.die();
            }
            // Otras acciones si es necesario
        }
      }

    //choque meta
    const cajaMeta = new THREE.Box3();
    cajaMeta.setFromObject(this.meta);

    const metaId = `meta`;
    const lastCollisionTime = this.lastCollisions.get(metaId) || 0;

    if (cajaPJ.intersectsBox(cajaMeta) && (currentTime - lastCollisionTime > this.collisionCooldown)) {
      this.lastCollisions.set(metaId, currentTime);
      this.velocity += 0.2;
      console.log("choque meta");
    }

  }


  update () {

    this.updatePJ(this.distance);
    this.updateCameraPosition(this.distance);
    this.updateCameraPjPosition(this.distance);
    this.distance += this.velocity*0.0005;

    for(let i=0; i<this.runas1.length ; i++){
      this.runas1[i].update();
    }

    for(let i=0; i<this.runas2.length ; i++){
      this.runas2[i].update();
    }

    for(let i=0; i<this.scrolls.length ; i++){
      this.scrolls[i].update();
    }

    for(let i=0; i<this.abejas.length ; i++){
      this.abejas[i].update();
    }

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    //colision
    this.check_collisions();
    
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
  window.addEventListener("mousedown", (event) => scene.onDocumentMouseDown(event, scene));


  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
