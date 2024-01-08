export default interface IComponent {
    
    /*
        TO IMPROVE
        Calling this will allox to retrieve all the resssources used by a component that is needed to preload
    */
    getRessourcesPath(): string[];
}