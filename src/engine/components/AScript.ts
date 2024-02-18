import EventManager from "../EventManager";
import GameObject from "../GameObject";
import IComponent from "./IComponent";

function assignParams(object: any, params: any) {
    console.log(`assign ${params} to ${object}`)
    Object.keys(params).forEach(key => {
        if (object.hasOwnProperty(key)) {
            object[key] = params[key];
        }
    });
}

export default abstract class AScript implements IComponent {

    gameobject: GameObject | null = null;

    constructor(params: any = null, waitEventToStart : boolean = false) {
        //this.gameobject = gameobject
        if (params)
            assignParams(this, params)
        EventManager.subscribe("updateScript", (t: number) => {this.update(t)})
        if (waitEventToStart)
            EventManager.subscribe("startScript", () => {this.start()})
        else
            this.start()
            //this.updateParams(params)
    }
     
    abstract start(): void;
    abstract update(deltaTime: number): void;
    //abstract updateParams(params: any):void;
    

    getRessourcesPath(): string[] {
        return []
    }
}