import GameObject from "./GameObject";
import { Transform } from "./ToolTypes";

export interface ISerializedScene {
    "gameObjects":
    {
        "name": "Player",
        "transform": Transform,
        "components":
        {
            "type": string,
            "params": any
        }[]
    }[]
}

export default interface IScene {
    gameobjects: GameObject[]
}