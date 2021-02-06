import React, { Component } from "react";
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "cannon/build/cannon.min.js";
import * as CANNON from "cannon";
import cannon from "cannon";
//import "./scss/main.scss";
//
const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//

class PhysicsTestOneCannon extends Component {
  componentDidMount() {
    // Here you are calling all the functions below
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  //
  //
  componentWillUnmount() {
    // this is related to the event listeners that cause problems when using the resizing
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);

    // this.controls.dispose();
  }
  /*


                                            ***  1   ***



  */
  sceneSetup = () => {
    //
    //                WIDTH/HEIGHT
    // --------------------------------------------
    //
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // --------------------------------------------
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //
    //
    //
    //
    //

    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    //
    //
    this.loader = new THREE.TextureLoader();
    //
    this.axesHelper = new THREE.AxesHelper(5);
    this.scene.add(this.axesHelper);
    // ---------------------------------------
    //                  RENDERER
    // ---------------------------------------
    //
    this.renderer = new THREE.WebGL1Renderer({
      alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    //
    this.renderer.setSize(width, height);
    //
    //
    //
    // shadowMap is connected to the shadows in any object/model
    this.renderer.shadowMap.enabled = true;
    // if you dont add the line below "THREE.PCFSoftShadowMap" you will have the shadow but...
    // BUT the shadow will be pixelated and UGLY
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //
    //
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
    // document.appendChild(this.renderer.domElement);  //before
    //

    //
    //
    //
    //---------------------------
    //     CONTROLS
    //---------------------------
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //
    //
    this.camera.position.y = 4;
    this.camera.position.z = 4;
    this.controls.target.y = 2;

    // this.camera.position.y = 10;
    // //
    // // this.camera.position.z = 3;
  };

  /*


                                            ***  2  ***



  */
  addCustomSceneObjects = () => {
    // //
    // this.physicsPlugin = new CannonJSPlugin(true, 10, cannon);
    // this.scene.enablePhysics(new Vector3(0, -9.8, 0), this.physicsPlugin);
    //
    //
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    // //world.broadphase = new CANNON.NaiveBroadphase() //
    // //world.solver.iterations = 10
    // //world.allowSleep = true
    //
    //
    //
    //

    //----------------------------------
    //          MODELS / Mesh
    //----------------------------------
    //
    //
    //
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.phongMaterial = new THREE.MeshPhongMaterial();
    //
    //
    //
    //-----------------
    //  CUBE
    //-----------------
    this.cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.cubeMesh = new THREE.Mesh(this.cubeGeometry, this.normalMaterial);
    this.cubeMesh.position.x = -3;
    this.cubeMesh.position.y = 3;
    this.cubeMesh.castShadow = true;
    this.scene.add(this.cubeMesh);
    //
    //
    //-----------------
    //  SPHERE
    //-----------------
    this.sphereGeometry = new THREE.SphereGeometry();
    this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.normalMaterial);
    this.sphereMesh.position.x = -1;
    this.sphereMesh.position.y = 3;
    this.sphereMesh.castShadow = true;
    this.scene.add(this.sphereMesh);
    //
    //
    //-----------------
    //  Icosahedron
    //-----------------
    //icosahedron is a polyhedron with 20 faces.
    //
    this.icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    this.icosahedronMesh = new THREE.Mesh(
      this.icosahedronGeometry,
      this.normalMaterial
    );
    this.icosahedronMesh.position.x = 1;
    this.icosahedronMesh.position.y = 3;
    this.icosahedronMesh.castShadow = true;
    this.scene.add(this.icosahedronMesh);
    //
    //
    //-----------------
    //  torusKnot
    //-----------------
    //
    this.torusKnotGeometry = new THREE.TorusKnotGeometry();
    this.torusKnotMesh = new THREE.Mesh(
      this.torusKnotGeometry,
      this.normalMaterial
    );
    this.torusKnotMesh.position.x = 4;
    this.torusKnotMesh.position.y = 3;
    this.torusKnotMesh.castShadow = true;
    this.scene.add(this.torusKnotMesh);
    //
    //
    //-----------------
    //  PLANE / FLOOR
    //-----------------
    //
    this.planeGeometry = new THREE.PlaneGeometry(25, 25);
    this.planeMesh = new THREE.Mesh(this.planeGeometry, this.phongMaterial);
    this.planeMesh.rotateX(-Math.PI / 2);
    this.planeMesh.receiveShadow = true;
    this.scene.add(this.planeMesh);
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //---------------------
    //    New Lights
    //---------------------
    // lights 1
    this.light1 = new THREE.SpotLight();
    this.light1.position.set(2.5, 5, 5);
    this.light1.angle = Math.PI / 4;
    this.light1.penumbra = 0.5;
    this.light1.castShadow = true;
    this.light1.shadow.mapSize.width = 1024;
    this.light1.shadow.mapSize.height = 1024;
    this.light1.shadow.camera.near = 0.5;
    this.light1.shadow.camera.far = 20;
    this.scene.add(this.light1);
    // //
    // //
    this.light2 = new THREE.SpotLight();
    this.light2.position.set(-2.5, 5, 5);
    this.light2.angle = Math.PI / 4;
    this.light2.penumbra = 0.5;
    this.light2.castShadow = true;
    this.light2.shadow.mapSize.width = 1024;
    this.light2.shadow.mapSize.height = 1024;
    this.light2.shadow.camera.near = 0.5;
    this.light2.shadow.camera.far = 20;
    this.scene.add(this.light2);
    //
    //
    //
    //
    //
  };
  /*


                                            ***  3   ***



  */

  startAnimationLoop = () => {
    //

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    this.renderer.render(this.scene, this.camera);
  };
  /*






  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // updated renderer
    this.renderer.setSize(width, height);
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
    // That is the Three.js optimization: you can group multiple camera changes into a block with only one
    this.camera.updateProjectionMatrix();
  };
  /*






  */

  render() {
    return (
      <div className="scene-oblivion">
        {/* --------------------- */}

        {/* --------------------- */}
        {/* --------------------- */}
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
        {/* --------------------- */}
        {/* --------------------- */}
        {/* --------------------- */}
      </div>
    );
  }
}

export default PhysicsTestOneCannon;
