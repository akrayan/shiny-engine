import IComponent from "./IComponent";
import EventManager from "../EventManager";
import RessourcesLoader from "../RessourcesLoader";
import GameObject from "../GameObject";

export interface IFrame {
  "texture": number,
  "width": number,
  "height": number,
  "sx": number,
  "sy": number
}

export interface IAnimation {
  "loop": boolean,
  "type": string,
  "version": number,
  "interval": number,
  "textures": string[],
  "frames": IFrame[]
}

export default class AnimatedSprite implements IComponent {
  gameobject: GameObject | null = null;
  private _animation: IAnimation;
  //img: HTMLImageElement;
  //px = 0;
  //py = 0;
  //sz = 1;
  currentFrame = 0
  layer = 1;
  time = 0

  //TODO might become asynchrone later
  static createFromSerialize(params: any) {
    console.log("try create sprite with :", params)

    const animation = RessourcesLoader.getInstance().getAsset(params.animation) as IAnimation
    console.log("indeed i have:", animation)
    return new AnimatedSprite(animation, params.sz, params.layer)
  }

  constructor(animation: IAnimation, sz = 1, layer = 1, gameobject?: GameObject) {
    if (gameobject)
      this.gameobject = gameobject
    //this.img = new Image()
    this._animation = structuredClone(animation);
    console.info('animation initialized', this._animation)
    this.layer = layer

    //should update the resource list
    EventManager.subscribe('updateAnimation', (t: number) => { this.update(t) })
    EventManager.subscribe('draw' + layer, (ctx: any) => { this.draw(ctx) })
    //in wait of better solution
    /*setInterval(() => {
      console.log("frame ", this.currentFrame)
      this.currentFrame++;
      if (this.currentFrame == this._animation.frames.length)
        this.currentFrame = 0}, animation.interval)*/
    //this.sz = sz;
  }

  getRessourcesPath(): string[] {
    return this._animation.textures
  }

  update(deltaTime: number) {
    //console.log("pdate", this)
    if (this._animation != undefined) {
      this.time += deltaTime
      if (this.time > this._animation.interval) {
        this.time = 0;
        this.currentFrame++;
        if (this.currentFrame == this._animation.frames.length)
          this.currentFrame = 0
      }
    }
  }

  /* TODO warning is dependent from textures and context, maybe we should have a renderer or something that handle evething,
      options :
          - just takes everything as parameter
          - just return all the necessary data to draw it from another class
          - call the rendering class passed as parameter ?
  */
  draw(gameContex: any) {
    if (this._animation != undefined) {
      const frame = this._animation.frames[this.currentFrame]
      const textureName = this._animation.textures[frame.texture]
      const texture = RessourcesLoader.getTexture(textureName)
      // TODO add gameobject.transform.position
      //return { texture, frame.sx, frame.sy, frame.width, frame.height, this.px, this.py, frame.width * this.sz, frame.height * this.sz }//draw parameter
      if (this.gameobject == null)
        console.error('Fail to draw, gameobject is null')
      else {
        const t = this.gameobject.transform

        gameContex?.drawImage(texture, frame.sx, frame.sy, frame.width, frame.height, t.position.x, t.position.y, frame.width * t.scale.x, frame.height * t.scale.x)
      }     //console.log('draw')
    }
  }
}