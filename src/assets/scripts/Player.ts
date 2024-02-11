import AScript from "../../engine/components/AScript";

export default class Player extends AScript {
    speed: number = 1;
    
    start(): void {
        
    }

    update(deltaTime: number): void {
        //TODO if arrow keys pressed move player
        if (this.gameobject != undefined) {
            this.gameobject.transform.position.x += this.speed* deltaTime;
        }
    }

    //TO IMPROVE oups wrong dependency ?
    getRessourcesPath(): string[] {
        return []
    }
}