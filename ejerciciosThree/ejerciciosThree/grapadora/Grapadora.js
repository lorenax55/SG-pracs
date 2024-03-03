
import * as THREE from 'three'

class Grapadora extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshStandardMaterial({ color: 0xCF0000 });
      this.material_w = new THREE.MeshStandardMaterial({ color: 0xEBE37A });

    
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor
    var tamano = 0.15;   // 15 cm de largo. Las unidades son metros
    var base = this.createBase(tamano);
    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
    this.movil = this.createMovil(tamano);
    
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    this.add (base);
    this.add (this.movil);
  }
  
  createBase(tama) {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
    var base = new THREE.Object3D();
    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (tama,tama*0.08,tama*0.2), this.material);
    cajaBase.position.y = tama*0.04;
    // La componente geometría se puede compartir entre varios meshes
    var geometriaPivote = new THREE.ConeGeometry (tama*0.05, tama*0.12);
    var pivote1 = new THREE.Mesh (geometriaPivote, this.material);
    var pivote2 = new THREE.Mesh(geometriaPivote, this.material);

    var colmillo1 = new THREE.Mesh(geometriaPivote, this.material_w);
    var colmillo2 = new THREE.Mesh(geometriaPivote, this.material_w);


    // Se posicionan los pivotes con respecto a la base
    pivote1.position.set (tama*0.45, tama*0.14, tama*0.05);
    pivote2.position.set(tama * 0.45, tama * 0.14, -tama * 0.05);

    colmillo1.position.set(-tama * 0.45, tama * 0.11, tama * 0.04);
    colmillo2.position.set(-tama * 0.45, tama * 0.11, -tama * 0.04);

    colmillo1.scale.set(0.8, 0.8, 0.8);
    colmillo2.scale.set(0.8, 0.8, 0.8);



    base.add(cajaBase);
    base.add(pivote1);
    base.add(pivote2);
    base.add(colmillo1);
    base.add(colmillo2);

    return base;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      rotacion : 0
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'rotacion', -0.125, 0.2, 0.001)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAngulo (-value) );
  }
  
  createMovil (tama) {
    // Se crea la parte móvil
    var cajaMovil = new THREE.Mesh (
        new THREE.BoxGeometry (tama, tama*0.12, tama*0.2),
        this.material
    );
      cajaMovil.position.set(-tama * 0.45, tama * 0.06, 0);

      var geometriaPivote = new THREE.ConeGeometry(tama * 0.05, tama * 0.12);

    var colmillo1u = new THREE.Mesh(geometriaPivote, this.material_w);
    var colmillo2u = new THREE.Mesh(geometriaPivote, this.material_w);

      colmillo1u.position.set(-tama * 0.9, -tama * 0.01, tama * 0.055);
      colmillo2u.position.set(-tama * 0.9, -tama * 0.01, -tama * 0.055);

    colmillo1u.scale.set(0.8, 0.8, 0.8);
    colmillo2u.scale.set(0.8, 0.8, 0.8);

      colmillo1u.rotateZ(180 * Math.PI / 180);
      colmillo2u.rotateZ(180 * Math.PI / 180);

      // Crear ojos
      var ojo1 = new THREE.Mesh(
          new THREE.SphereGeometry(tama * 0.03, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0x000000 }) // Material negro
      );
      var ojo2 = ojo1.clone(); // Clonar ojo1 para crear ojo2

      // Posicionar los ojos
      ojo1.position.set(-tama * 0.15, tama * 0.08, tama * 0.1); // A la derecha del pivote
      ojo2.position.set(-tama * 0.15, tama * 0.08, -tama * 0.1); // A la izquierda del pivote


    var movil = new THREE.Object3D();
    // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
    movil.rotation.z = this.guiControls.rotacion;
    movil.position.set(tama*0.45,tama*0.2,0);
      movil.add(cajaMovil);
      movil.add(colmillo1u);
      movil.add(colmillo2u);
      movil.add(ojo1);
      movil.add(ojo2);
    return movil;
  }
  
  setAngulo (valor) {
    this.movil.rotation.z = valor;
  }
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Grapadora }
