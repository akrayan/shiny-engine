import GameObject from "./GameObject";
import RessourcesLoader from "./RessourcesLoader";
import EventManager from "./EventManager";
import AScript from "./AScript";
import IScene from "./IScene";

export type ScriptMap = {
    [key: string]: new (gameobject: GameObject) => AScript;
}

export default class GameEngine {
    lastTimestamp: number = 0;
    gameContex: CanvasRenderingContext2D;
    gameObjects: GameObject[] = []
    scriptMap: ScriptMap;

    constructor(contex: CanvasRenderingContext2D, scriptMap: ScriptMap, startScene: IScene) {
        this.gameContex = contex
        
        this.scriptMap = scriptMap
        
        this.loadScene(startScene)
        //RessourcesLoader.loadRessourcesUsedBySprites(gameObjects, () => { this.launchGame() })
        
        //requestAnimationFrame(gameloop)
    }

    //TODO create a sceneLoader class
    loadScene(scene: IScene ) {
        //clean previous scene
        //TODO unload Resources and load New ressources
        this.gameObjects = []

        //load json
        //deserialize ///
        this.gameObjects = scene.gameobjects

        RessourcesLoader.loadRessourcesUsedBySprites(this.gameObjects, () => { this.launchGame() })
    
    }

    launchGame() {
        console.log("will lauunch game")
        requestAnimationFrame((t) => { this.gameloop(t) })
    }

    renderLoop() {

        //if (gameContex != null) {
        this.gameContex.imageSmoothingEnabled = false // enable pixel perfect
        this.gameContex.fillStyle = "black"
        this.gameContex.fillRect(0, 0, 800, 600)
        /*
        TO IMPROVE
        TODO

        how to prioritize the draw ?
            - trigrer event draw + layer ? ex EventManager.trigger('draw0', deltaTime), EventManager.trigger('draw1', deltaTime)
        */
        EventManager.trigger('draw0', this.gameContex)
        EventManager.trigger('draw1', this.gameContex)
        /*sprites.forEach(sprite => {
            sprite.draw()
        });*/
        //}
    }

    gameloop(time: number) {
        console.log("gameloop start", time)
        const deltaTime = time - this.lastTimestamp
        this.lastTimestamp = time
        //if (RessourcesLoader.isRessourcesReady()) {
        EventManager.trigger('updateAnimation', deltaTime)
        //updateAnimation(deltaTime)
        this.renderLoop()
        //}
        /*
          TODO
          else display loader
        */
        console.log("finito")
        requestAnimationFrame((t) => { this.gameloop(t) })
    }
}