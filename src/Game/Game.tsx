import React, { useEffect, useRef } from 'react';
//import player_sprite from "./assets/textures/Astronaut_Jump.png"
//import player_animation from "../assets/animations/player_jump.json"
import GameEngine from '../engine/GameEngine';
import GameObject from '../engine/GameObject';
import EventManager from '../engine/EventManager';
import AnimatedSprite, {IAnimation } from '../engine/components/AnimatedSprite';
import scriptMap from '../assets/scripts';
//import scene1 from '../assets/scenes/scene1.json'
//import IScene, { ISerializedScene } from '../engine/IScene';
import { JSDocAllType } from 'typescript';

export interface IGameProps {
}
/*
function initScene() {
  /*
    init and place game object
  */

  //sprites.push(new AnimatedSprite(player_sprite, 24, 24, 5))
/*  let gameObjects = [new GameObject()]
  gameObjects[0].addComponents([new AnimatedSprite(player_animation as IAnimation, 5)])
  return gameObjects
}*/

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
        
        engine = new GameEngine(context, scriptMap, './assets/scenes/scene1.json')
        //engine = new GameEngine(context, initScene(), scriptMap)
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
