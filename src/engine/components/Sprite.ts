import IComponent from "./IComponent";
import EventManager from "../EventManager";
import RessourcesLoader from "../RessourcesLoader";
import GameObject from "../GameObject";
import { Vector2 } from "../ToolTypes";

export interface Texture {
  texturePath: string
  size: Vector2
  offset: Vector2
  repeatable: boolean
}

export class Sprite implements IComponent {
  readonly type: string = "Sprite";
  texture: Texture
  //dimensions: Vector2

  //texture: string;
  //offset: Vector2
  //img: HTMLImageElement;
  //px = 0;
  //py = 0;
  //w: number;
  //h: number;
  //sz = 1;


  gameobject: GameObject | null = null;
  layer = 1;

  constructor({ texture, layer = 1, gameobject }:
    { texture: Texture, layer?: number, gameobject?: GameObject }) {
    //this.img = new Image()

    /*this.w = w;
    this.h = h;
    this.texture = texture;
    this.offset = offset
    this.sz = sz;*/

    if (gameobject)
      this.gameobject = gameobject
    this.layer = layer
    this.texture = texture
    console.log(`register CS : ${texture} for (${'draw' + layer})`)
    EventManager.subscribe('draw' + layer, (ctx: any) => { this.draw(ctx) })
  }


  //TODO might become asynchrone later
  static createFromSerialize(params: any) {
    console.log("try create sprite with :", params)
    return new Sprite({ texture: params.texture, layer: params.layer })
  }


  getRessourcesPath(): string[] {
    return [this.texture.texturePath]
  }
  /*
    draw(gameContext: CanvasRenderingContext2D) {
      console.log("draw start with scaled and scrolled texture inside a fixed-size square");
  
      const texture = RessourcesLoader.getTexture(this.texture);
      if (this.gameobject == null) {
        console.error('Fail to draw, gameobject is null');
      } else {
        // Créer un canvas temporaire
        let tempCanvas = document.createElement('canvas');
        let tempCtx = tempCanvas.getContext('2d');
        if (tempCtx)
          tempCtx.imageSmoothingEnabled = false
        // Définir la taille du canvas temporaire égale à la taille de la texture * l'échelle désirée
        const scale = 2; // Exemple d'échelle pour agrandir la texture
        tempCanvas.width = texture.width * scale;
        tempCanvas.height = texture.height * scale;
  
        // Dessiner la texture sur le canvas temporaire à la nouvelle échelle
        tempCtx?.drawImage(texture, 0, 0, tempCanvas.width, tempCanvas.height);
  
        // Utiliser le canvas temporaire comme source pour créer un motif répétable
        const pattern = gameContext.createPattern(tempCanvas, 'repeat');
        if (pattern)
          gameContext.fillStyle = pattern;
        gameContext.imageSmoothingEnabled = false
  
        const t = this.gameobject.transform;
  
        // Appliquer l'offset pour le défilement
        gameContext.save(); // Sauvegarder l'état actuel du contexte
        gameContext.translate(t.position.x + this.offset.x, t.position.y + this.offset.y);
  
        // Dessiner le carré fixe en utilisant le motif répétable avec l'offset appliqué
        const squareSize = 1000; // Exemple de taille, ajustez selon vos besoins
        gameContext.fillRect(-this.offset.x, -this.offset.y, squareSize, squareSize);
  
        gameContext.restore(); // Restaurer l'état précédent du contexte
  
        console.log("draw finish with scaled and scrolled texture inside a fixed-size square");
  
      }
    }
  */

  draw(gameContex: CanvasRenderingContext2D) {
    console.log("classic draw start")
    if (this.gameobject) {
      const image = RessourcesLoader.getTexture(this.texture.texturePath)
      const offset = this.texture.offset
      const size = Vector2.multiply(this.texture.size, this.gameobject?.transform.scale)
      const pos = this.gameobject?.transform.position
      //TODO if texture.size == undefined alors size = image.width
      /*if (this.texture.repeatable) {
        image.offsetLeft
        const pattern = gameContex.createPattern(image, 'repeat')
        gameContex.fillRect(pos.x, pos.y, size.x, size.y)
      }
      else {*/
      console.log("off = ", offset)
      console.log("pos = ", pos)
      console.log("size = ", size)
      gameContex?.drawImage(image, offset.x, offset.y, image.width, image.height, pos.x, pos.y, size.x, size.y)
      /*
            }
            if (this.gameobject == null)
              console.error('Fail to draw, gameobject is null')
            else {
              const t = this.gameobject.transform
            }*/
      console.log("classic draw finish")
    }
  }
}
