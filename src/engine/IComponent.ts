import GameObject from "./GameObject";

export default interface IComponent {
    //TO Improve, make it ssafe and not accessible to everyone
    gameobject: GameObject | null;
    /*
        TO IMPROVE
        Calling this will allox to retrieve all the resssources used by a component that is needed to preload
    */
    getRessourcesPath(): string[];
}