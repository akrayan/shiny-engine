import IComponent from "./IComponent";
import EventManager from "../EventManager";
import RessourcesLoader from "../RessourcesLoader";
import GameObject from "../GameObject";
import { Color, Vector2 } from "../ToolTypes";

export interface Texture {
  texturePath: string
  size: Vector2
  offset: Vector2
  repeatable: boolean
}

export class RectShape implements IComponent {
  readonly type: string = "RectShape";
  color: Color = {r: 0, g: 0, b: 0, a: 1}
  dimensions: Vector2 = {x: 0, y: 0}
  position: Vector2 = {x: 0, y: 0}
  layer = 1;
  gameobject: GameObject | null = null;

  constructor({layer = 1, color = {r: 0, g: 0, b: 0, a: 1}, dimensions = {x: 0, y: 0}, position = {x: 0, y: 0}, gameobject }:
    { layer?: number, color: Color , dimensions: Vector2, position: Vector2, gameobject?: GameObject }) {
    if (gameobject)
      this.gameobject = gameobject
    this.layer = layer
    this.dimensions = dimensions
    this.position = position
    this.color = color
    EventManager.subscribe('draw' + layer, (ctx: any) => { this.draw(ctx) })
  }


  //TODO might become asynchrone later
  static createFromSerialize(params: any) {
    console.log("try create sprite with :", params)
    return new RectShape({color: params.color, dimensions: params.dimensions, position: params.position , layer: params.layer })
  }


  getRessourcesPath(): string[] {
    return []
  }

  draw(gameContex: CanvasRenderingContext2D) {
    console.log(`draw {rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})} at `, this.position.x, this.position.y, this.dimensions.x, this.dimensions.y)
    gameContex.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
    gameContex.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y)
  }
}
