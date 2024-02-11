import GameObject from "./GameObject";
import RessourcesLoader from "./RessourcesLoader";
import EventManager from "./EventManager";
import AScript from "./components/AScript";
import IScene, { ISerializedScene } from "./IScene";
import AnimatedSprite from "./components/AnimatedSprite";
import { loadScene } from "./SceneManager";
import {ComponentFactory, ScriptMap } from "./components/ComponentFactory";

export type {ScriptMap}


export default class GameEngine {
    lastTimestamp: number = 0;
    gameContex: CanvasRenderingContext2D;
    gameObjects: GameObject[] = []

    constructor(contex: CanvasRenderingContext2D, scriptMap: ScriptMap, startScene: string) {
        this.gameContex = contex

        //this.scriptMap = scriptMap
        ComponentFactory.getInstance().initializeMap(scriptMap)
        loadScene(startScene).then(() => {
            this.launchGame()
        })
        //this.loadScene(startScene)
        //RessourcesLoader.loadRessourcesUsedBySprites(gameObjects, () => { this.launchGame() })

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
        //console.log("gameloop start", time)
        const deltaTime = time - this.lastTimestamp
        this.lastTimestamp = time
        //if (RessourcesLoader.isRessourcesReady()) {
        EventManager.trigger('updateAnimation', deltaTime)
        EventManager.trigger('updateScript', deltaTime)
        //updateAnimation(deltaTime)
        this.renderLoop()
        //}
        /*
          TODO
          else display loader
        */
        //console.log("finito")
        requestAnimationFrame((t) => { this.gameloop(t) })
    }
}