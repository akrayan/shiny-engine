import React, { useEffect, useRef } from 'react';
//import player_sprite from "./assets/textures/Astronaut_Jump.png"
import player_animation from "../assets/animations/player_jump.json"
import GameEngine from '../engine/GameEngine';
import GameObject from '../engine/GameObject';
import EventManager from '../engine/EventManager';
import AnimatedSprite, {IAnimation } from '../engine/AnimatedSprite';
import scriptMap from '../assets/scripts';

export interface IGameProps {
}
/*
export var gameContex: CanvasRenderingContext2D | null = null;


let sprites: AnimatedSprite[] = []

interface IFrame {
  "texture": number,
  "width": number,
  "height": number,
  "sx": number,
  "sy": number
}

interface IAnimation {
  "loop": boolean,
  "type": string,
  "version": number,
  "interval": number,
  "textures": string[],
  "frames": IFrame[]
}

let lastTimestamp: number = 0;



function loadRessources() {
  let texturesToLoad: string[] = [];

  sprites.forEach(s => texturesToLoad.push(...s.animation.textures))
  loadTextures(texturesToLoad)
}

const render = () => {

  if (gameContex != null) {
    gameContex.imageSmoothingEnabled = false // enable pixel perfect
    gameContex.fillStyle = "black"
    gameContex.fillRect(0, 0, 800, 600)
    sprites.forEach(sprite => {
      sprite.draw()
    });
  }
}

function updateAnimation(deltaTime: number) {
  sprites.forEach(s => s.update(deltaTime))
}

function gameloop(time: number) {
  const deltaTime = time - lastTimestamp
  lastTimestamp = time
  if (RessourcesLoader.isRessourcesReady()) {
    updateAnimation(deltaTime)
    render()
  }
  /*
    TODO
    else display loader
  *//*
  requestAnimationFrame(gameloop)
}
*/
function initScene() {
  /*
    init and place game object
  */

  //sprites.push(new AnimatedSprite(player_sprite, 24, 24, 5))
  let gameObjects = [new GameObject()]
  gameObjects[0].components = [new AnimatedSprite(player_animation as IAnimation, 5)]
  return gameObjects
}

var engine: GameEngine | null = null

export default function Game(props: any) {
  const canvasRef: React.LegacyRef<HTMLCanvasElement> = useRef(null) //React.ClassAttributes<HTMLCanvasElement>.ref?: React.LegacyRef<HTMLCanvasElement>
  useEffect(() => {
    if (engine == null) {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (context != null) {
        //const context = canvas.getContext('2d')
        //gameContex = context
        engine = new GameEngine(context, initScene(), scriptMap)
        //initScene()
        //loadRessources()
        //requestAnimationFrame(gameloop)
      }
     }
  }, [])
  return (
    <canvas width={800} height={600} ref={canvasRef} className={`${props.className}`}>

    </canvas>
  );
}
