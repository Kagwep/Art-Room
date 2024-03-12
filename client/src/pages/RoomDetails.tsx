import React, { useContext,useEffect, useRef,useState } from "react";
import './style.css';
import { useParams } from "react-router-dom";
import { RoomContext } from "../contexts/RoomsContext";
import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  SceneLoader,
  Mesh,
  ISceneLoaderAsyncResult,
  AbstractMesh,
  PhysicsImpostor,
  VertexBuffer,
  ArcRotateCamera,
  CubeTexture,
  ActionManager,
  ExecuteCodeAction,
  UniversalCamera,
  Color3,
  AmmoJSPlugin,
  CannonJSPlugin,
  HavokPlugin
} from "@babylonjs/core";
import '@babylonjs/loaders';
import { TfiRulerAlt } from "react-icons/tfi";
import HavokPhysics from "@babylonjs/havok";

type KeyStatus = {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
  b: boolean;
  Shift: boolean;
};

const roomDetails = () => {
  // get the room id from url
  const { id } = useParams();
  const { rooms } = useContext(RoomContext);

  //get the single room based on id
  const room = rooms.find((item) => {
    if (id !== undefined) {
    return item.id === parseInt(id);
  }
  });



  // destructure room

  const createScene = async (canvas: HTMLCanvasElement | null): Promise<{ scene: Scene | undefined}> => {

    if (!canvas) {
      // If canvas is null, return a promise with an object where scene is undefined
      return Promise.resolve({ scene: undefined, defaultSpheres: () => {},moveSpheres: () => {},playersTurn:'' });
    }    

    let speed: number;
    let animSpeed;
    
      const engine = new Engine(canvas, true);

      // scene
      const scene = new Scene(engine);

      scene.ambientColor =  new Color3(1,1,1);
      scene.gravity = new Vector3(0,-0.75,0);

      scene.collisionsEnabled = true;







   // camera
      const camera = new UniversalCamera("UniversalCamera", new Vector3(0,2,-25), scene);

      camera.setTarget(Vector3.Zero());

      camera.applyGravity = true;
      
      camera.ellipsoid = new Vector3(0.4,0.8,0.4);

      camera.checkCollisions = true;

      camera.attachControl(canvas, true);

      const hero = MeshBuilder.CreateBox("hero", {size: 2.0}, scene);
      hero.position.x = 0.0;
      hero.position.y = 1.0;
      hero.position.z = 0.0;
      //hero.physicsImpostor = new PhysicsImpostor(hero, PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.0, friction: 0.1 }, scene);

      const pointer = MeshBuilder.CreateSphere("Sphere", { diameter: 0.01 }, scene);
      pointer.position.x = 0.0;
      pointer.position.y = 0.0;
      pointer.position.z = 0.0;
      pointer.isPickable = false;

      let moveForward: boolean = false;
      let moveBackward: boolean = false;
      let moveRight: boolean = false;
      let moveLeft: boolean = false;


      const onKeyDown = function (event: { keyCode: any; }) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                break;
        }
    };

    const onKeyUp = function (event: { keyCode: any; }) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };
    
    

    document.addEventListener('keydown',onKeyDown,false);
    document.addEventListener('keyup',onKeyUp,false);


    scene.registerBeforeRender(()=> {

        //Your code here
        //Step
            //let stats = document.getElementById("stats");
            //stats.innerHTML = "";  
            const SPEED = 0.1;

            let moveX = 0;
            let moveZ = 0;
            
            if (moveForward) {
                moveZ += SPEED;
            }
            if (moveBackward) {
                moveZ -= SPEED;
            }
            if (moveRight) {
                moveX += SPEED;
            }
            if (moveLeft) {
                moveX -= SPEED;
            }
            
            hero.position.x += moveX;
            hero.position.z += moveZ;
            
            camera.position.x = hero.position.x;
            camera.position.y = hero.position.y + 1.0;
            camera.position.z = hero.position.z;
            pointer.position = camera.getTarget();            

    });

    let isLocked = false;
    

    scene.onPointerDown = (evt) => {
      if (!isLocked){
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock){
          canvas.requestPointerLock();
        }
      }
    }


    	// Event listener when the pointerlock is updated (or removed by pressing ESC for example).
	const pointerlockchange =  () => {

		let controlEnabled = (document as any).mozPointerLockElement || (document as any).webkitPointerLockElement || (document as any).msPointerLockElement || document.pointerLockElement || null;
		
		// If the user is already locked
		if (!controlEnabled) {
			//camera.detachControl(canvas);
			isLocked = false;
		} else {
			//camera.attachControl(canvas);
			isLocked = true;
		}
	};
  	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);


  const border0 = MeshBuilder.CreateBox("border0", {size : 1.0}, scene);
  border0.scaling = new Vector3(5, 100, 200);
  border0.position.x = -100.0;
  border0.checkCollisions = true;
  border0.isVisible = false;

  const border1 = MeshBuilder.CreateBox("border1", {size : 1.0}, scene);
  border1.scaling = new Vector3(5, 100, 200);
  border1.position.x = 100.0;
  border1.checkCollisions = true;
  border1.isVisible = false;

  const border2 = MeshBuilder.CreateBox("border2", {size : 1.0}, scene);
  border2.scaling = new Vector3(200, 100, 5);
  border2.position.z = 100.0;
  border2.checkCollisions = true;
  border2.isVisible = false;

  const border3 = MeshBuilder.CreateBox("border3", {size : 1.0}, scene);
  border3.scaling = new Vector3(200, 100, 5);
  border3.position.z = -100.0;
  border3.checkCollisions = true;
  border3.isVisible = false;

  // border0.physicsImpostor = new PhysicsImpostor(border0, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  // border1.physicsImpostor = new PhysicsImpostor(border1, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  // border2.physicsImpostor = new PhysicsImpostor(border2, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  // border3.physicsImpostor = new PhysicsImpostor(border3, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);



  
      const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 2, 0), scene);


      hemiLight.intensity = 1;
    
      //const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

      // const board = SceneLoader.ImportMesh('','./models/','board.gltf',scene,(meshes) => {
      //   console.log('meshes',meshes)
      // })

    


      
      const loadModels = async (modelName:string) => {
        try {
          const result = await SceneLoader.ImportMeshAsync('', '/models/', modelName);
          // Do something with the result here
          return result; // You can return the result if needed
        } catch (error) {
          // Handle errors if necessary
          console.error(error);
          throw error; // Re-throw the error if needed
        }
      };
      
      // Call the function
      const {meshes} = await loadModels('canvasarium.gltf');

      let boardRootMesh = meshes.find(mesh => mesh.name === '__root__');

      if (boardRootMesh) {
        boardRootMesh.position = new Vector3(5.5, 1, 0);
    }

     meshes.map(mesh => {
      mesh.checkCollisions = true;
     });





      // const player = player_meshes.find(mesh => mesh.name === '__root__');


      // Assuming 'scene' is your Babylon.js scene object
      engine.runRenderLoop(() => {


        scene.render();
      });
    
      window.addEventListener('resize', () => {
        engine.resize();
      });

      //ground.material = CreateGroundMaterial(scene);
      // ball.material = CreateBallMaterial(scene);

    
      return {scene};
  };


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<Scene | undefined>(undefined);


  useEffect(() => {
    const loadScene = async (): Promise<() => void> => {
      const {scene:sceneCreated} = await createScene(canvasRef.current);

      
      // Optionally, you can handle the scene instance or perform additional actions here

      if (sceneCreated) {
        setScene(sceneCreated);

      }
      
      return () => {
        if (sceneCreated) {
          sceneCreated.dispose(); // Clean up the scene when the component unmounts
        }
      };
    };

    const cleanup = loadScene().then(cleanupFunction => cleanupFunction);

    return () => {
      cleanup.then(cleanupFunction => cleanupFunction());
    };
  }, []);


  //console.log("am available here",playerTurn);

  return (
    <div className="container mx-auto">
      <div className="w-full mt-28 h-screen  flex justify-center items-center">
          <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>

  );
};

export default roomDetails;

