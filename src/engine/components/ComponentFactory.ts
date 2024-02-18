import GameObject from "../GameObject";
import RessourcesLoader from "../RessourcesLoader";
import AnimatedSprite, { IAnimation } from "./AnimatedSprite";
import AScript from "./AScript";
import IComponent from "./IComponent";
import { Sprite } from "./Sprite";



export type ScriptMap = {
    [key: string]: new (params: any) => AScript;
}

export class ComponentFactory {

    private static  _instance: ComponentFactory
    scriptMap: ScriptMap | null = null;

    public static getInstance(): ComponentFactory {
        if (!ComponentFactory._instance) {
            ComponentFactory._instance = new ComponentFactory();
        }

        return ComponentFactory._instance;
    }

    initializeMap(scriptMap: ScriptMap){
        this.scriptMap = scriptMap
    }

    createComponent(cmpType: string, params :any): IComponent {
        switch (cmpType) {
            case "AnimatedSprite":
                return AnimatedSprite.createFromSerialize(params);
            case "Sprite":
                return Sprite.createFromSerialize(params);
            default:
                if (this.scriptMap == null)
                    throw new Error('Error : ScriptMap is null');
                if (cmpType in this.scriptMap) {
                    return new (this.scriptMap[cmpType])(params)
                    //assignParams(script, params)
                }
                throw new Error(`Error : ${cmpType} is not in the scriptmap`);
                /*
                if (c.cmpType in this.scriptMap) {
                    let script = new (this.scriptMap[c.cmpType])(gameObject)
                    for (const key in c.params) {
                        if (script.hasOwnProperty(key))
                            script[key] = c.params[key]
                    }
                }
                break;
                */
        }
    }
}
