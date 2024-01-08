import GameObject from "./GameObject";
import RessourcesLoader from "./RessourcesLoader";
import EventManager from "./EventManager";
import IScript from "./IScript";

export type ScriptMap = {
    [key: string]: new () => IScript;
}

export default class GameEngine {
    lastTimestamp: number = 0;
    gameContex: CanvasRenderingContext2D;
    gameObjects: GameObject[] = []
    scriptMap: ScriptMap;

    constructor(contex: CanvasRenderingContext2D, gameObjects: GameObject[], scriptMap: ScriptMap) {
        this.gameContex = contex
        this.gameObjects = gameObjects
        this.scriptMap = scriptMap
        RessourcesLoader.loadRessourcesUsedBySprites(gameObjects, () => { this.launchGame() })
        
        //requestAnimationFrame(gameloop)
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