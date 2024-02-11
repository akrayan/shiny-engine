import GameObject from "./GameObject";
import { Transform } from "./ToolTypes";

export interface ISerializedGameObject {
    "name": string,
    "transform": Transform,
    "components":[
    {
        "type": string,
        "params": any
    }]
}

export interface ISerializedScene {
    "dependencies": {"json":[string], "images": [string]}
    "gameObjects":[ISerializedGameObject]
}

export default interface IScene {
    gameObjects: GameObject[]
}