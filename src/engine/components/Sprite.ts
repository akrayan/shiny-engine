import IComponent from "./IComponent";
import EventManager from "../EventManager";
import RessourcesLoader from "../RessourcesLoader";
import GameObject from "../GameObject";
import { Vector2 } from "../ToolTypes";

export class Sprite implements IComponent {
  readonly type: string = "Sprite";
  texture: string;
  offset: Vector2
  //img: HTMLImageElement;
  px = 0;
  py = 0;
  w: number;
  h: number;
  sz = 1;

  gameobject: GameObject | null = null;
  layer = 1;

  constructor({ texture, offset = { x: 0, y: 0 }, w = 0, h = 0, sz = 1, layer = 1, gameobject }:
    { texture: string, offset?: Vector2, w?: number, h?: number, sz?: number, layer?: number, gameobject?: GameObject }) {
    //this.img = new Image()
    this.w = w;
    this.h = h;
    this.texture = texture;
    this.offset = offset
    this.sz = sz;
    if (gameobject)
      this.gameobject = gameobject
    this.layer = layer

    console.log(`register CS : ${texture} for (${'draw' + layer})`)
    EventManager.subscribe('draw' + layer, (ctx: any) => { this.draw(ctx) })
  }


  //TODO might become asynchrone later
  static createFromSerialize(params: any) {
    console.log("try create sprite with :", params)
    return new Sprite({ texture: params.texture, sz: params.sz, layer: params.layer })
  }


  getRessourcesPath(): string[] {
    return [this.texture]
  }
  draw(gameContext: CanvasRenderingContext2D) {
    console.log("draw start with repeatable texture");

    const texture = RessourcesLoader.getTexture(this.texture);

    if (this.gameobject == null) {
      console.error('Fail to draw, gameObject is null');
    } else {
      // Créer un motif répétable à partir de la texture
      const pattern = gameContext.createPattern(texture, 'repeat');
      if (pattern)
        gameContext.fillStyle = pattern;

      const t = this.gameobject.transform;

      // Ajuster l'origine du motif pour le faire défiler
      gameContext.translate(t.position.x + this.offset.x, t.position.y + this.offset.y);

      // Dessiner le rectangle (ou une autre forme) avec le motif répétable
      // Notez que vous devez peut-être ajuster les dimensions pour votre cas d'utilisation spécifique
      gameContext.fillRect(-this.offset.x, -this.offset.y, texture.width * t.scale.x + Math.abs(this.offset.x), texture.height * t.scale.y + Math.abs(this.offset.y));

      // Réinitialiser la translation pour ne pas affecter les dessins ultérieurs
      gameContext.translate(-t.position.x - this.offset.x, -t.position.y - this.offset.y);

      console.log("draw finish with repeatable texture");
    }
  }
}
/*
draw(gameContex: CanvasRenderingContext2D) {
  console.log("classic draw start")
    const texture = RessourcesLoader.getTexture(this.texture)
    
    if (this.gameobject == null)
      console.error('Fail to draw, gameobject is null')
    else {
      const t = this.gameobject.transform
      gameContex?.drawImage(texture, this.offset.x, this.offset.y, texture.width, texture.height, t.position.x, t.position.y, texture.width * t.scale.x, texture.height * t.scale.y)
    }
    console.log("classic draw finish")
  }
}*/