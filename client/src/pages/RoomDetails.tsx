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
  HavokPlugin,
  ActionEvent,
  BabylonFileLoaderConfiguration
} from "@babylonjs/core";
import '@babylonjs/loaders';
import { TfiRulerAlt } from "react-icons/tfi";
import HavokPhysics from "@babylonjs/havok";
import * as CANNON from 'cannon';

// Make Cannon.js available in the global scope
BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON ;
window.CANNON = CANNON;

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

      scene.ambientColor =  new Color3(.1,0.1,0.1);
      //scene.gravity = new Vector3(0,-0.75,0);

     
 

      scene.collisionsEnabled = true;

  


   // camera
      //const camera = new UniversalCamera("UniversalCamera", new Vector3(5,5,22), scene);
      const camera = new FreeCamera("FreeCamera", new Vector3(0,2,5), scene);

      camera.setTarget(Vector3.Zero());

     

      camera.checkCollisions = true;


      camera.applyGravity = true;

      camera.checkCollisions = true;

      camera.ellipsoid = new Vector3(1,1,1);

      camera.minZ = 0.35
      

      camera.attachControl(canvas, true);

      camera.speed = 0.75;

      camera.angularSensibility = 4000




      
      var gravityVector = new Vector3(0,-9.81, 0);
      var physicsPlugin = new CannonJSPlugin();
      scene.enablePhysics(gravityVector, physicsPlugin);

      // const hero = MeshBuilder.CreateBox("hero", {size: 0.1}, scene);
      // hero.position.x = 5.42;
      // hero.position.y = 1.0;
      // hero.position.z = 22.75;
      // hero.physicsImpostor = new PhysicsImpostor(hero, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      
        // Create a basic box
        // const testBox = MeshBuilder.CreateBox("testBox", {size: 20}, scene);

        // // Create a standard material with a red color
        // const redMaterial = new StandardMaterial("redMat", scene);
        // redMaterial.diffuseColor = new Color3(1, 0, 0); // RGB for red
        // testBox.material = redMaterial;

        // // Position the box in the scene (adjust as necessary)
        // testBox.position = new Vector3(5, 1, 20);

        // // Enable collisions for the box
        // testBox.checkCollisions = true;

      const pointer = MeshBuilder.CreateSphere("Sphere", { diameter: 0.01 }, scene);
      pointer.position.x = 0.0;
      pointer.position.y = 0.0;
      pointer.position.z = 0.0;
      pointer.isPickable = false;

      let moveForward: boolean = false;
      let moveBackward: boolean = false;
      let moveRight: boolean = false;
      let moveLeft: boolean = false;
      let moveUp:boolean = false;
      let moveDown:boolean = false;



    camera.keysUp.push(87)
    camera.keysLeft.push(65)
    camera.keysDown.push(83)
    camera.keysRight.push(68)
  

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
      const {meshes} = await loadModels('artroom3.glb');

        
          // Example function to apply physics to meshes with geometry
      meshes.forEach(mesh => {
            mesh.unfreezeWorldMatrix();
            mesh.checkCollisions = true;
            mesh.checkCollisions = true;
          });

      let boardRootMesh = meshes.find(mesh => mesh.name === '__root__')?.unfreezeWorldMatrix();
      

      if (boardRootMesh) {
        boardRootMesh.position = new Vector3(5.5, 1, 0);
        boardRootMesh.checkCollisions = true;
        boardRootMesh.actionManager = new ActionManager(scene);

    
    }



    //  var actionParameter = { trigger: ActionManager.OnIntersectionEnterTrigger, parameter: hero };

    //  boardRootMesh?.actionManager?.registerAction(new ExecuteCodeAction(actionParameter, function(event: ActionEvent) 
    //  {
    //      console.log("Hit!");
    //  }));

    //   // Unfreeze the world matrix if needed
    meshes[7].unfreezeWorldMatrix();
       meshes[106].unfreezeWorldMatrix();
       meshes[107].unfreezeWorldMatrix();
       meshes[110].unfreezeWorldMatrix();
       meshes[111].unfreezeWorldMatrix();
       meshes[131].unfreezeWorldMatrix();

    //   // Reference the mesh directly

    const roof = meshes[7];
    roof.checkCollisions = true;

    const roofUpper = meshes[111];
    roofUpper.checkCollisions = true;


    const test_mesh = meshes[106];
     test_mesh.checkCollisions = true;

     const test_mesh_one = meshes[107];
     test_mesh_one.checkCollisions = true;


     const test_mesh_three = meshes[110];
     test_mesh_three.checkCollisions = true;
     

     const test_mesh_four = meshes[131];
     test_mesh_four.checkCollisions = true;
    //   // Then proceed with your logic
    //   if (test_mesh) {
    //       test_mesh.physicsImpostor = new PhysicsImpostor(
    //           test_mesh,
    //           PhysicsImpostor.MeshImpostor,
    //           { mass: 0, restitution: 0.9 },
    //           scene
    //       );
    //   }


    console.log(meshes)


      const roofPaint = new StandardMaterial("roof_material",scene);
      const roofPaintUpper = new StandardMaterial("roofUpper_material",scene);
      const paint42 = new StandardMaterial("material", scene);
      const paint43 = new StandardMaterial("materialOne", scene);
      const paint44 = new StandardMaterial("materialTWo", scene);
      const paint45 = new StandardMaterial("materialThree", scene);

    //   // Load the texture
      const texture = new Texture("https://res.cloudinary.com/duybctvku/image/upload/v1710409854/_27262f6a-ccf7-4ea1-a21b-6296504c1814_qvifas.jpg", scene);
      const textureOne = new Texture("https://res.cloudinary.com/dydj8hnhz/image/upload/v1713328718/DALL_E_2024-04-16_18.38.44_-_Illustration_of_a_Forest_Kingdom_for_a_3D_MMO_strategy_game._This_world_is_characterized_by_a_dense_ancient_forest_with_towering_trees_hidden_paths_ei2pzk.jpg", scene);
      const roofTexture = new Texture("https://res.cloudinary.com/dydj8hnhz/image/upload/v1713329431/DALL_E_2024-04-17_07.49.36_-_A_highly_detailed_panoramic_space-themed_image_suitable_for_use_as_a_decorative_element._The_image_should_capture_the_essence_of_outer_space_filled_axh51i.jpg", scene);
      const roofUpperTexture = new Texture("https://res.cloudinary.com/dydj8hnhz/image/upload/v1713331226/roof_a7naiy.jpg", scene);
      const textureTwo = new Texture("https://res.cloudinary.com/dydj8hnhz/image/upload/v1713328708/DALL_E_2024-04-16_18.38.36_-_Artistic_depiction_of_Highland_Empires_for_a_3D_MMO_strategy_game._The_setting_is_a_rugged_mountainous_terrain_with_high_peaks_deep_valleys_and_fort_l1ihty.jpg", scene);
      const textureThree = new Texture("https://res.cloudinary.com/dydj8hnhz/image/upload/v1713328715/DALL_E_2024-04-16_18.38.28_-_Illustration_of_a_Frozen_Wasteland_for_a_3D_MMO_strategy_game._The_environment_is_a_cold_harsh_landscape_of_ice_and_snow_featuring_frozen_lakes_sno_mvr4v6.jpg", scene);



     texture.vScale = -1;
     textureOne.vScale = -1;
     textureTwo.vScale = -1;
     textureThree.vScale =  -1;

      
    //   // Assign the texture to the material
     paint42.diffuseTexture = texture;
     paint43.diffuseTexture = textureOne;
     roofPaint.diffuseTexture = roofTexture;
     roofPaintUpper.diffuseTexture = roofUpperTexture;
     paint44.diffuseTexture = textureTwo;
     paint45.diffuseTexture = textureThree;
      
    //   // Assign the material to the mesh
       test_mesh.material = paint42;
       test_mesh_one.material = paint43;
       roof.material = roofPaint;
       roofUpper.material = roofPaintUpper;
       test_mesh_three.material = paint44;
       test_mesh_four.material = paint45;


   
      // const player = player_meshes.find(mesh => mesh.name === '__root__');
     // hero.checkCollisions = true;

            



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
    <div >
      
          <canvas className="canvas" ref={canvasRef}></canvas>
      
    </div>

  );
};

export default roomDetails;

