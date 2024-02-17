export default class InputManager {
    private static _instance: InputManager;
    private _inputs_up: Map<string, boolean>;
    private _inputs_down: Map<string, boolean>;
    private _inputs_press: Map<string, boolean>;


    //TODO check if singleton is a a good idea
    constructor() {
        this._inputs_up = new Map<string, boolean>()
        this._inputs_down = new Map<string, boolean>()
        this._inputs_press = new Map<string, boolean>()

        document.addEventListener("keydown", (event) => {
                const keyName : string = event.key;
                this._inputs_down.set(keyName, true);
                this._inputs_up.set(keyName, false);
            },
            false,
        );
        document.addEventListener("keyup", (event) => {
            const keyName : string = event.key;
            this._inputs_down.set(keyName, false);
            this._inputs_up.set(keyName, true);
        },
        false,
    );
    }

    public static getInstance(): InputManager {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }
        return InputManager._instance;
    }

    public static getKeyDown(key: string): boolean {
        return this.getInstance()._inputs_down.get(key) ?? false
    }

    public static getKeyUp(key: string): boolean {
        return this.getInstance()._inputs_up.get(key) ?? false
    }
}