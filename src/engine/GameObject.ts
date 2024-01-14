import IComponent from "./IComponent"

export default class GameObject {
    transform: Transform = new Transform()
    components: IComponent[] = []
    constructor() {

    }
    addComponents(components: IComponent[]){
        components.forEach(c => {
            c.gameobject = this
        })
        this.components.push(...components)
    }
}