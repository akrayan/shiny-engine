import IComponent from "./components/IComponent"
import { Transform } from "./ToolTypes"

export default class GameObject {
    name: string
    transform: Transform = new Transform()
    components: IComponent[] = []
    
    constructor(name: string) {
        this.name = name
    }
    addComponent(component: IComponent) {
        component.gameobject = this
        this.components.push(component)
    }

    addComponents(components: IComponent[]){
        components.forEach(c => {
            c.gameobject = this
        })
        this.components.push(...components)
    }
}