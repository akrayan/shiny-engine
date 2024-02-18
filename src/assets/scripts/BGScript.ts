import AScript from "../../engine/components/AScript";
import { Sprite } from "../../engine/components/Sprite";

export default class BGScript extends AScript {
  readonly type: string = "BGScript";
    speed: number = 0.1;

    async start() {
    }


    update(deltaTime: number): void {
        if (this.gameobject != undefined) {
            let bgsprite : Sprite | null = this.gameobject.getComponent("Sprite") as Sprite;
            if (bgsprite) {
                bgsprite.offset.y += this.speed * deltaTime
            }
        }
    }


    //TO IMPROVE oups wrong dependency ?
    getRessourcesPath(): string[] {
        return []
    }
}