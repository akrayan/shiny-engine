import GameObject from "../GameObject";
import RessourcesLoader from "../RessourcesLoader";
import AnimatedSprite, { IAnimation } from "./AnimatedSprite";


type ComponentStatic = {
    createFromSerialize: (params: any) => IComponent;
  };
  
export default interface IComponent {
    //TO Improve, make it ssafe and not accessible to everyone
    gameobject: GameObject | null;
    readonly type: string
    /*
        TO IMPROVE
        Calling this will allox to retrieve all the resssources used by a component that is needed to preload
    */
    getRessourcesPath(): string[];
    //createFromSerialize(params: any) : IComponent;
}