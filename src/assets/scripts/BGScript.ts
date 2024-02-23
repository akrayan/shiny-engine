import { Color } from "../../engine/ToolTypes";
import AScript from "../../engine/components/AScript";
import { RectShape } from "../../engine/components/RectShape";
import { Sprite } from "../../engine/components/Sprite";

export default class BGScript extends AScript {
  readonly type: string = "BGScript";
    speed: number = 0.1;
    time: number = 0;
    rect: RectShape | null = null

    async start() {
        if (this.gameobject)
            this.rect = this.gameobject.getComponent("RectShape") as RectShape
    }

    interpolateColor(color1: Color, color2: Color, factor: number): Color {
        if (factor > 1) factor = 1;
        if (factor < 0) factor = 0;
        const result: Color = { r: 0, g: 0, b: 0, a: 1 };
        result.r = Math.round(color1.r + (color2.r - color1.r) * factor);
        result.g = Math.round(color1.g + (color2.g - color1.g) * factor);
        result.b = Math.round(color1.b + (color2.b - color1.b) * factor);
        return result;
    }
    
    getColorForTime(time: number, x: number, y: number, z: number): Color {
        const skyBlue: Color = { r: 135, g: 206, b: 235, a: 1 };
        const sunsetOrange: Color = { r: 255, g: 165, b: 0, a: 1 };
        const twilightPurple: Color = { r: 138, g: 43, b: 226, a: 1 };
        const spaceBlack: Color = { r: 0, g: 0, b: 0, a: 1 };
    
        let color: Color;
        if (time <= 0) {
            color = skyBlue;
        } else if (time >= z) {
            color = spaceBlack;
        } else {
            const factor1 = time < x ? time / x : 0;
            const factor2 = time >= x && time < y ? (time - x) / (y - x) : 0;
            const factor3 = time >= y ? (time - y) / (z - y) : 0;
    
            if (time < x) {
                color = this.interpolateColor(skyBlue, sunsetOrange, factor1);
            } else if (time >= x && time < y) {
                color = this.interpolateColor(sunsetOrange, twilightPurple, factor2);
            } else {
                color = this.interpolateColor(twilightPurple, spaceBlack, factor3);
            }
        }
    
        return color;
    }

    update(deltaTime: number): void {
        this.time += deltaTime
        if (this.gameobject) {
            if (this.rect) {
                this.rect.color = this.getColorForTime(this.time, 20000, 25000, 30000)
            }
            else
                this.rect = this.gameobject.getComponent("RectShape") as RectShape
        }
        /*if (this.gameobject != undefined) {
            let bgsprite : Sprite | null = this.gameobject.getComponent("Sprite") as Sprite;
            if (bgsprite) {
                bgsprite.offset.y += this.speed * deltaTime
            }
        }*/
    }


    //TO IMPROVE oups wrong dependency ?
    getRessourcesPath(): string[] {
        return []
    }
}