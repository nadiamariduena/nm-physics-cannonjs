# 🌈🌈🌈

# PHYSICS with Cannon

<br>
<br>
<br>

### INSTALL cannonjs 🐖

```javascript
npm three
//
npm install cannon
```

<br>
<br>

### IMPORT IT ☁️

<br>

#### HOW THE SCENE should look like before we start adding all the OBJECTS

```javascript
//
// -------------------------
// IMPORTS **
//
import React, { Component } from "react";
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "cannon/build/cannon.min.js";
//
// -------------------------
//
const style = {
  height: 600, // we can control scene size by setting container dimensions
};

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
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
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
      1,
      1000
    );
    this.camera.position.y = 10;
    //
    // this.camera.position.z = 3;
    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    //
    //
    this.loader = new THREE.TextureLoader();
    //
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
    // BG color from the scene
    // showMap is connected to the shadows in any object/model
    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
    // document.appendChild(this.renderer.domElement);  //before
    //
    //
  };

  /*
                                            ***  2  ***



  */
  addCustomSceneObjects = () => {
    //
    //---------------------------
    //     CONTROLS
    //---------------------------

    //----------------------------------
    //         BLENDER  MODELS
    //----------------------------------
    //

    //---------------------
    //   Directional Light
    //---------------------
    //
    // //
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.gammaFactor = 2.2;

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, -1, 100);

    // position as follow , the light comes from x:-1000, comes from: y and the last comes from : z
    directionalLight.position.set(1000, 1000, 1000);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(
      -100,
      200,
      -200,
      200,
      0.5,
      5000
    );
    // //
    this.scene.add(directionalLight);
    // The light points to the flat ground
    // this.directionalLight.target = this.plane;  //dont add this
    //
    //
    //THIS LIGHT IS ON THE BOTTOM
    //---------------------
    //     spotLight FF5733
    //---------------------
    //

    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff, 0.5); //intensity:   0.5);
    // spotLight.position.set( 0 , 10 , 0 );
    this.spotLight.position.set(5, -50, 0); //x, y , z   original (5, -50, 0);
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    //
    // this will remove the shadows
    this.spotLight.visible = true;
    //
    this.scene.add(this.spotLight);
    // //
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
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>

        {/* --------------------- */}
      </div>
    );
  }
}

export default PhysicsTestOneCannon;
```

<br>
<br>
<br>

## 🍨

### ADD THE ORBITS CONTROL

```javascript
//---------------------------
//     CONTROLS
//---------------------------
// OrbitControls allow a camera to orbit around the object
// https://threejs.org/docs/#examples/controls/OrbitControls
this.controls = new OrbitControls(this.camera, this.renderer.domElement);
```

<br>
<br>

### ADD THE CANNONjs to the scene

- You are going to have an **error** after adding the following: 🔴

```javascript
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
// //world.broadphase = new CANNON.NaiveBroadphase() //
// //world.solver.iterations = 10
// //world.allowSleep = true
```

- **The Reason** for that Error is because **you haven't install the _TYPES_**

- In the tutorial I am following, it says I have to create a typescript file, but since i am not working with typescript I might have to find another way.

<br>

# 👾

#### ANOTHER WAY

- _**INSTALL**_ THE TYPES

```javascript
// https://www.npmjs.com/package/@types/cannon
 npm install --save @types/cannon
```

<br>

#### IMPORT IT ☁️

- I added these 3 lines because I still don't know which one will work when i will start building the scene

```javascript
import "cannon/build/cannon.min.js";
import * as CANNON from "cannon";
import cannon from "cannon";

//
//
//
  addCustomSceneObjects = () => {

    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    //
    //
    // -----------------
    // WE DONT NEED THE LINES BELOW (NOT in the moment)
    // //world.broadphase = new CANNON.NaiveBroadphase() //
    // //world.solver.iterations = 10
    // //world.allowSleep = true
    //
    //
```

- The import was succesful if after typing the dot "after" CANNON you can see all these options

<br>

[<img src="./src/images/adding-cannonjs-installing-types.gif"/>]()

<br>
<br>

# 🌈

## ADDING THE FIRST GEOMETRIES

```javascript
//----------------------------------
//          MODELS / Mesh
//----------------------------------
//
//
//
this.normalMaterial = new THREE.MeshNormalMaterial();
this.phongMaterial = new THREE.MeshPhongMaterial();

this.cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
this.cubeMesh = new THREE.Mesh(this.cubeGeometry, this.normalMaterial);
this.cubeMesh.position.x = -3;
this.cubeMesh.position.y = 3;
this.cubeMesh.castShadow = true;
this.scene.add(this.cubeMesh);
```

### PREVIEW

- ITS MOVING LIKE THAT because of the ORBITS CONTROL

[<img src="./src/images/firstimpression_.gif"/>]()
