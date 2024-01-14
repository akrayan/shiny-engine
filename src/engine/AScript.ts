import GameObject from "./GameObject";
import IComponent from "./IComponent";


export default abstract class AScript implements IComponent {

    gameobject: GameObject;

    constructor(gameobject: GameObject) {
        this.gameobject = gameobject
    }

    abstract start(): void;
    abstract update(): void;

    getRessourcesPath(): string[] {
        return []
    }
}