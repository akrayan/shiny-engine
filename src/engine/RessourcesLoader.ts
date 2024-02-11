import { IAnimation } from "./components/AnimatedSprite";
import GameObject from "./GameObject";

//QUESTION : should it be singleton
export default class RessourcesLoader {
    private static _instance: RessourcesLoader;
    private _ressourcesReady: boolean = false;
    private _textures: { [key: string]: HTMLImageElement; } = {};
    //private _animations: {[key: string]: IAnimation; } = {};
    private _cache: Map<string, any>;


    //TODO check if singleton is a a good idea
    constructor() {
        this._cache = new Map<string, any>()
    }

    public static getInstance(): RessourcesLoader {
        if (!RessourcesLoader._instance) {
            RessourcesLoader._instance = new RessourcesLoader();
        }
        return RessourcesLoader._instance;
    }

    public static isRessourcesReady(): boolean {
        return this.getInstance()._ressourcesReady
    }

    public static getTexture(name: string): HTMLImageElement {
        //TODO handle error if texture not find, imply to catch error everywhere else this texture is draw
        return this.getInstance()._textures[name]
    }

    //TODO handle more than only AnimatedSprite
    public static loadRessourcesUsedBySprites(gameObjects: GameObject[], onload: any) {
        let paths: string[] = []
        gameObjects.forEach(g => g.components.forEach(c => paths.push(...c.getRessourcesPath())))

        return this.getInstance().loadTextures(paths, onload)
    }


    public loadTextures(texturesPath: string[], onload: any) {
        let promises: any[] = [];

        texturesPath.forEach(path => {
            let img = new Image();
            this._textures[path] = img;

            let promise = new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                console.log("will try to load", path)
                img.src = path; // Assurez-vous que player_sprite est défini ou changez-le en fonction du chemin
            });

            promises.push(promise);
        });

        Promise.all(promises).then(() => {
            this._ressourcesReady = true;
            console.log("Toutes les ressources sont chargées.");
            onload()
        }).catch(() => {
            console.error("Erreur lors du chargement des ressources.");
        });
    }


    public async loadAsset(path: string): Promise<any> {
        if (this._cache.has(path)) {
            return this._cache.get(path);
        }

        console.log('try to fetch :', path)

        const response = await fetch(path);
        const data = await response.json();
        console.log('fetch ', response.status)
        //if (data.type == 'animation')
        //    this._animations[path] = data
        this._cache.set(path, data);
        return data;
    }

    public async loadAssets(paths: string[]): Promise<void> {
        await Promise.all(paths.map(path => this.loadAsset(path)));
    }

    public getAsset(path: string) {
        console.log(`i want to get ${path} from :`, this._cache)
        if (this._cache.has(path)) {
            return this._cache.get(path);
        }
    }
    //load textures
    //const promises: Promise[] = []

    /*await Promise.all(texturesPath.map((str) => new Promise<void>(() => {
      
    })))*/
    /*texturesPath.forEach((p) => {
      textures[p] = new Image()
      
      textures[p].onload()
    })*/
    /* console.log("tex path", texturesPath)
     let path = texturesPath[0];
     textures[path] = new Image()
     textures[path].onload = () => ressourcesReady = true
     textures[path].src = player_sprite // TODO change because that a quick fix done with winx magic
   }*/
    //TODO allow to load ressources from folder or just from a path list 
}

