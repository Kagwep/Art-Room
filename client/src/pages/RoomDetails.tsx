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
  ExecuteCodeAction
} from "@babylonjs/core";
import '@babylonjs/loaders';

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
      const scene = new Scene(engine);
   
      var camera = new ArcRotateCamera("camera1", 0,  0, 10, Vector3.Zero(), scene);

      camera.attachControl(canvas, true);

      camera.speed = 0.1;

      camera.wheelPrecision = 10;


  
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


      const charcter = async () => {
        try {
          const result = await SceneLoader.ImportMeshAsync("", "/models/", "HVGirl.glb",scene);
          // Do something with the result here
          return result; // You can return the result if needed
        } catch (error) {
          // Handle errors if necessary
          console.error(error);
          throw error; // Re-throw the error if needed
        }
      };

      const {meshes: player_meshes} = await charcter();

      // const player = player_meshes.find(mesh => mesh.name === '__root__');


      const player = player_meshes[0];

      



      player.scaling.setAll(0.02);

      camera.setTarget(player);


    
     const walkingAnim = scene.getAnimationGroupByName("Walking");
     const walkingBackAnim = scene.getAnimationGroupByName("WalkingBack");
     const idleAnim = scene.getAnimationGroupByName("Idle");
     const sambaAnim = scene.getAnimationGroupByName("Samba");



      const playerWalkSpeed = 0.05;
      const playerRunSpeed = 0.1;
      const playerSpeedBackwards = 0.01;
      const playerRotationSpeed = 0.01;
      const runAnimSpeed = 3;
      const walkAnimSpeed = 1;



      let keyStatus:KeyStatus = {
        w: false,
        s:false,
        a: false,
        d: false,
        b: false,
        Shift: false
      }

      scene.actionManager = new ActionManager(scene);

      scene.actionManager.registerAction( new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (e) => {
        let key = e.sourceEvent.key as keyof KeyStatus;

        if (key !== "Shift"){
          key = key.toLowerCase() as keyof KeyStatus;

        }
        if (key in keyStatus){
          keyStatus[key] = true;

        }
      }));


      scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (e) => {
          let key = e.sourceEvent.key as keyof KeyStatus;

          if(key !== "Shift"){
            key = key.toLowerCase() as keyof KeyStatus;
          }

          if(key in keyStatus){
            keyStatus[key] = false;
          }
      }))

      let moving = false;

      scene.onBeforeRenderObservable.add(
          () => {
            if (
              keyStatus.w || 
              keyStatus.s || 
              keyStatus.d || 
              keyStatus.a || 
              keyStatus.b 
              ){
                moving = true
                if (keyStatus.s && !keyStatus.w){
                  speed = -playerSpeedBackwards;
                  walkingBackAnim?.start(true,1,walkingBackAnim.from, walkingBackAnim.to, false);
                }else if (keyStatus.w || keyStatus.a || keyStatus.d){
                  speed = keyStatus.Shift ? playerRunSpeed : playerWalkSpeed;
                  animSpeed = keyStatus.Shift ? runAnimSpeed :  walkAnimSpeed;
  
                  if (walkingAnim){
                     walkingAnim.speedRatio = animSpeed;
                     walkingAnim.start(true,animSpeed,walkingAnim.from, walkingAnim.to, false);
                    }
                  
                }

                if(keyStatus.a){
                  player.rotate(Vector3.Up(), -playerRotationSpeed);
                }
                if(keyStatus.d){
                  player.rotate(Vector3.Up(), playerRotationSpeed);
                }

                player.moveWithCollisions(player.forward.scaleInPlace(speed));
              } else if (moving){
                idleAnim?.start(true,1.0,idleAnim.from, idleAnim.to, false);
                sambaAnim?.stop();
                walkingAnim?.stop();
                walkingBackAnim?.stop;
                moving = false;
              }
          }
      )
      
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
