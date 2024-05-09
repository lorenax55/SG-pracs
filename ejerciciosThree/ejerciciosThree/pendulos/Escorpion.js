
import * as THREE from 'three'
class Escorpion extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshStandardMaterial({ color: 0xCF0FF0 });
      this.material_w = new THREE.MeshStandardMaterial({ color: 0xEBE37A });

    
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor
    var tamano = 0.5;   // 15 cm de largo. Las unidades son metros
    var base = this.createBase(tamano);
    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
      this.cajaMovil2 = null

      this.cajaMovil2 = null

      this.movil1 = this.createMovil1(tamano);
      this.movil2 = this.createMovil2(tamano);

    
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
      this.add(base);

      this.add(this.movil1);
      this.movil1.add(this.movil2);

  }
  
  createBase(tama) {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
      var base = new THREE.Object3D();

    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (tama*0.2,tama*0.05,tama*0.2), this.material);
      cajaBase.position.y = tama * 0.025;

    var ojo1 = new THREE.Mesh(new THREE.SphereGeometry(tama*0.03,10,10), this.material_w);
      ojo1.position.set(tama * 0.1, tama * 0.03, -tama * 0.03);

    var ojo2 = new THREE.Mesh(new THREE.SphereGeometry(tama * 0.03, 10, 10), this.material_w);
      ojo2.position.set(tama * 0.1, tama * 0.03, tama * 0.03);


    base.add(cajaBase);
    base.add(ojo1);
    base.add(ojo2);


    return base;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
        rotacion1: 3.6,
        rotacion2: 4.2

    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add(this.guiControls, 'rotacion1', Math.PI * 0.7, Math.PI * 1.45, 0.001)
          .name('Rot1 : ')
          .listen();

      folder.add(this.guiControls, 'rotacion2', Math.PI * 1.3, Math.PI * 2.4, 0.001)
          .name('Rot2 : ')
          .listen();

  }
  
    createMovil1(tama) {
        // Se crea la parte móvil
        var cajaMovil1 = new THREE.Mesh(new THREE.BoxGeometry(tama * 0.05, tama * 0.2, tama * 0.05), this.material);
        cajaMovil1.position.set(0, -tama * 0.1, 0);

        var movil = new THREE.Object3D();
        // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
        movil.rotation.z = this.guiControls.rotacion1;
        movil.position.set(-tama * 0.1, tama * 0.05, 0);
        movil.add(cajaMovil1);

        return movil;
    }

    createMovil2(tama) {
        // Se crea la parte móvil
        var cajaMovil2 = new THREE.Mesh(new THREE.BoxGeometry(tama * 0.05, tama * 0.2, tama * 0.05), this.material);
        cajaMovil2.position.set(0, -tama * 0.1, 0);

        var movil = new THREE.Object3D();
        // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
        movil.rotation.z = this.guiControls.rotacion2;
        movil.position.set(0, -tama*0.2,0 );
        movil.add(cajaMovil2);

        return movil;
    }
  

  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
      this.movil1.rotation.z = this.guiControls.rotacion1;
      this.movil2.rotation.z = this.guiControls.rotacion2;
  }
}

export { Escorpion }
