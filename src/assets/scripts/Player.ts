import InputManager from "../../engine/InputManager";
import AScript from "../../engine/components/AScript";

export default class Player extends AScript {
    speed: number = 0.1;
    _currentSpeed = 0.1;

    start(): void {
    }

    update(deltaTime: number): void {
        if (this.gameobject != undefined) {
            if (InputManager.getKeyDown('ArrowLeft')) {
                this.gameobject.transform.position.x -= this._currentSpeed * deltaTime
            }
            if (InputManager.getKeyDown('ArrowRight')) {
                this.gameobject.transform.position.x += this._currentSpeed * deltaTime
            };

            //this.gameobject.transform.position.x += this._currentSpeed * deltaTime
            if (InputManager.getKeyDown('ArrowUp')) {
                this.gameobject.transform.position.y -= this._currentSpeed * deltaTime
            }
            if (InputManager.getKeyDown('ArrowDown')) {
                this.gameobject.transform.position.y += this._currentSpeed * deltaTime
            }
        }
        /*
        //TODO if arrow keys pressed move player
        if (this.gameobject != undefined) {
            if (this.gameobject.transform.position.x > 400)
                this._currentSpeed = this.speed * -1
            if (this.gameobject.transform.position.x < 100)
                this._currentSpeed = this.speed 
            this.gameobject.transform.position.x += this._currentSpeed * deltaTime;
*/
    }


    //TO IMPROVE oups wrong dependency ?
    getRessourcesPath(): string[] {
        return []
    }
}