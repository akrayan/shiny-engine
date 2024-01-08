import IComponent from "./IComponent";
import EventManager from "./EventManager";
import RessourcesLoader from "./RessourcesLoader";

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
  animation: IAnimation;
  //img: HTMLImageElement;
  px = 0;
  py = 0;
  sz = 1;
  currentFrame = 0
  layer = 1;
  time = 0

  constructor(animation: IAnimation, sz = 1, layer = 1) {
    //this.img = new Image()
    this.animation = animation;
    //should update the resource list
    EventManager.subscribe('updateAnimation', (t: number) => {this.update(t)})
    EventManager.subscribe('draw'+layer, (ctx: any) => {this.draw(ctx)})
    //in wait of better solution
    /*setInterval(() => {
      console.log("frame ", this.currentFrame)
      this.currentFrame++;
      if (this.currentFrame == this.animation.frames.length)
        this.currentFrame = 0}, animation.interval)*/
    this.sz = sz;
    this.layer = layer
  }

  getRessourcesPath(): string[] {
    return this.animation.textures
  }

  update(deltaTime: number) {
    console.log("pdate", this)
    this.time += deltaTime
    if (this.time > this.animation.interval) {
      this.time = 0;
      this.currentFrame++;
      if (this.currentFrame == this.animation.frames.length)
        this.currentFrame = 0
    }
  }

  /* TODO warning is dependent from textures and context, maybe we should have a renderer or something that handle evething,
      options :
          - just takes everything as parameter
          - just return all the necessary data to draw it from another class
          - call the rendering class passed as parameter ?
  */
  draw(gameContex: any) {

    const frame = this.animation.frames[this.currentFrame]
    const textureName = this.animation.textures[frame.texture]
    const texture = RessourcesLoader.getTexture(textureName)
    // TODO add gameobject.transform.position
    //return { texture, frame.sx, frame.sy, frame.width, frame.height, this.px, this.py, frame.width * this.sz, frame.height * this.sz }//draw parameter 
    gameContex?.drawImage(texture, frame.sx, frame.sy, frame.width, frame.height, this.px, this.py, frame.width * this.sz, frame.height * this.sz)
    //console.log('draw')
  }
}